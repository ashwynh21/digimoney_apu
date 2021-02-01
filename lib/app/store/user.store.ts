import Store from '../declarations/store';
import Ash from '../declarations/application';

import mongoose from 'mongoose';
import axios from 'axios';

import { UserModel, UserSchema } from '../models/user.model';
import { WalletModel } from '../models/wallet.model';
import { WalletStore } from './wallet.store';

export class UserStore extends Store<UserModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'user',
            storage: UserSchema,
        });
    }

    protected oninit(): void {
        /*
         * //TODO: implement oninint()
         * */
    }

    protected onready(): void {
        /*
         * //TODO: implement onready()
         * */
    }

    protected onmodel(schema: mongoose.Schema): void {
    }

    create(data: Partial<UserModel>): Promise<UserModel> {
        return axios.get(`https://easygeni.com/getpin.php?pin=${data.pin}`)
            .then((response) => {
                const immigration = JSON.parse(response.data)[0];

                data.firstname = immigration.FNAME;
                data.lastname = immigration.SURNAME;
                data.gender = immigration.GENDER == 'M' ? 'male' : 'female';

                return super.create(data)
                    .then((value) => {

                        return this.context.query<WalletModel, WalletStore>('wallet').create({
                            customer: value._id
                        }).then((_) => value);
                    });
            })
    }
}
