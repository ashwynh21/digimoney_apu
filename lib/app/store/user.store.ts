import Store from '../declarations/store';

import mongoose from 'mongoose';

import {Application} from '../declarations/application';
import {UserModel, UserSchema} from '../models/user.model';

export class UserStore extends Store<UserModel> {
    constructor(app: Application) {
        super(app, {
            name: 'user',
            storage: UserSchema
        });
    }

    protected oninit(): void {
        /*
        * //TODO: implement oninint()
        * */
    }

    protected onmodel(schema: mongoose.Schema<UserModel>): void {
        /*
        * //TODO: implement onmodel()
        * */
    }

    protected onready(): void {
        /*
        * //TODO: implement onready()
        * */
    }

}
