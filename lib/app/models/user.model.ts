import { Schema } from 'mongoose';
import { Model } from '../helpers/model';

export interface UserModel extends Model {
    username: string;
    password: string;

    access: Array<string>;
}

export const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        password: String,
        access: [String],

        created: Date,
        updated: Date,
    },
    { collection: 'users' },
);
