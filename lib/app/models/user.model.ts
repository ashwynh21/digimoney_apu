import { Schema } from 'mongoose';
import { Model } from '../helpers/model';

export interface UserModel extends Model {
    cellphone: string;
    pin: string;
    status: string;
}

export const UserSchema = new Schema(
    {
        cellphone: {
            type: String,
            unique: true,
        },
        pin: String,
        status: String,

        created: Date,
        updated: Date,
    },
    { collection: 'users' },
);
