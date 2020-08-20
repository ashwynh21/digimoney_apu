import {Service} from '../../declarations/service';
import {UserModel, UserSchema} from '../../models/user.model';
import {Application} from '../../declarations';

import services from './user.service';
import mongoose from "mongoose";
import {UserStore} from '../../store/user.store';

export class User extends Service<UserModel> {
    constructor(context: Application) {
        super(context, {
            name: 'user',
            store: 'user',
        });

        super.addservices(services(this));
    }

    public authorize(data: UserModel): Promise<UserModel> {
        if(!data.mobile) throw Error('Oops, mobile number is required!');

        return (this.context.query('user') as UserStore).storage.findOne({mobile: data.mobile, secret: data.secret})
                .then((value: mongoose.Document | null) => {
                    if(!value) throw Error('Oops, mobile number or secret is incorrect!');

                    return value as unknown as UserModel;
                });
    }
}
