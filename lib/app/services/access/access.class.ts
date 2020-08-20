import {Service} from "../../declarations/service";
import {Application} from "../../declarations";
import {User} from "../user/user.class";
import {UserModel} from '../../models/user.model';

import jwt from "jsonwebtoken";
import constants from '../../constants';
import service from './access.service';

export class Access extends Service<UserModel> {
    public constructor(app: Application) {
        /*
        This service does not have a model or data store so we have to be careful with the constructor
         */
        super(app, {
            name: 'access'
        });

        /*
        We now access to this
         */
        this.addservices(service(this));
    }

    public access(data: UserModel): Promise<UserModel> {
        if(!data.secret) throw Error(constants.strings.incorrect_credentials);

        const settings = this.context.get('authorization');

        return (this.context.fetch(settings.entity) as User).authorize(data)
            .then((value) => {
                if(value) {
                    const result = ({...value} as unknown as {_doc: UserModel & {token: string}})._doc;
                    /*
                    Once the user is validated here we then begin generating a valid token using the jwt
                    configuration establish in the above implementation.
                     */
                    /*
                    This function will be providing a user that has not logged in and does not have a token with
                     a new access token. We start by defining the structure of the token that will be returned.
                     */

                    /*
                    a smarter way to determine if the user account is verified is through the access token.
                    what we could do is check if the payload of the access token has the mobile field written.
                    if it does not then the user is not to be considered in having a verified account.
                     */
                    delete result.qrcode;
                    delete result.image;

                    result.token = jwt.sign({
                        header: {
                            alg: 'HS256',
                            typ: 'JWT',
                        },
                        payload: result,
                        signature: {
                            iss: 'info@' + this.context.get('host'),
                            sub: 'info@' + this.context.get('host'),
                            aud: this.context.get('host'),
                            iat: Date.now(),
                            exp: Date.now() + settings.expiration
                        }
                    }, settings.secret, {
                        algorithm: 'HS256',
                        expiresIn: settings.expiration
                    });

                    return result;
                }

                throw Error(constants.strings.incorrect_credentials);
            });
    }
}
