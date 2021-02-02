import { UserService } from '../user/user.class';
import { UserModel } from '../../models/user.model';

import jwt from 'jsonwebtoken';
import constants from '../../constants';
import service from './access.service';
import axios from 'axios';

import Ash from '../../declarations/application';
import Service from '../../declarations/service';
import { WalletModel } from '../../models/wallet.model';
import { WalletStore } from '../../store/wallet.store';

export class AccessService extends Service<UserModel> {

    values: { [cellphone: string]: string } = {};

    public constructor(app: Ash) {
        /*
        This service does not have a model or data store so we have to be careful with the constructor
         */
        super(app, {
            name: 'access',
        });

        /*
        We now access to this
         */
        this.addservices(service(this));
    }

    public async access(data: Partial<UserModel>): Promise<UserModel> {
        if (!data.pin) throw Error(constants.strings.incorrect_credentials);

        const settings = this.context.configuration['authorization'];

        return this.context.fetch<UserModel, UserService>('customer').authorize(data).then((value) => {
            return this.context.query<WalletModel, WalletStore>('wallet').storage.findOne({
                customer: value._id
            })
                .then((wallet: WalletModel) => {

                    if (value && wallet) {
                        const result = (({ ...value } as unknown) as { _doc: UserModel })._doc as UserModel & { wallet: WalletModel };

                        result.wallet = wallet;
                        result.token = jwt.sign(
                            {
                                header: {
                                    alg: 'HS256',
                                    typ: 'JWT',
                                },
                                payload: result,
                                signature: {
                                    iss: 'info@' + this.context.configuration['host'],
                                    sub: 'info@' + this.context.configuration['host'],
                                    aud: this.context.configuration['host'],
                                    iat: Date.now(),
                                    exp: Date.now() + settings.expiration,
                                },
                            },
                            settings.secret,
                            {
                                algorithm: 'HS256',
                                expiresIn: settings.expiration,
                            },
                        );

                        return result;
                    }

                    throw Error(constants.strings.incorrect_credentials);
                })
        });
    }

    public async otp(data: Partial<UserModel>): Promise<Partial<UserModel>> {
        const num = Math.floor(Math.random() * 8999 + 1000).toString();

        if(data.cellphone) {
            this.values[data.cellphone] = num;

            await axios.get(`http://smpp.ignitivelab.com:9501/api?action=sendmessage&username=digimoney&password=digigeni&recipient=268${data.cellphone}&messagetype=SMS:TEXT&messagedata=${encodeURIComponent(`DIGIMONEY OTP: ${num}`)}`);

            setTimeout(() => {
                if(data.cellphone) {
                    delete this.values[data.cellphone];
                }
            }, 120000);
        }

        return data;
    }

    public async verify(data: Partial<UserModel & { otp: string }>): Promise<Partial<UserModel>> {
        if(!(data.cellphone && this.values[data.cellphone] && this.values[data.cellphone] == data.otp))
            throw Error('Oops, incorrect OTP');

        delete this.values[data.cellphone];

        return data;
    }
}
