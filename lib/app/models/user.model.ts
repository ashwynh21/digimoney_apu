import { Schema } from 'mongoose';
import { Model } from '../helpers/model';

export interface UserModel extends Model {
    username: string;
    password: string;

    access: Array<string>;
}

export const UserSchema = new Schema<UserModel>(
    {
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        updated: {
            type: Date,
            default: new Date(),
        },
        created: Date,

        access: [String],
    },
    { collection: 'users' },
);
