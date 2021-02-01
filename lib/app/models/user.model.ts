import { Schema } from 'mongoose';
import { Model } from '../helpers/model';

export interface UserModel extends Model {
    firstname: string;
    middlename: string;
    lastname: string;
    gender: 'male' | 'female';
    dob: Date;
    image: string;

    cellphone: string;
    pin: string;
    status: string;
    id_number: string;
}

export const UserSchema = new Schema(
    {
        firstname: String,
        middlename: String,
        lastname: String,
        gender: String,
        dob: Date,
        avatar: String,
        cellphone: {
            type: String,
            unique: true,
            validate: {
                validator: (mobile: string) => {
                    return /(268)?(\+268)?([7])+([689])+([0-9]{6})/.test(mobile);
                },
                message: 'Oops, cellphone is invalid format!',
            },
        },
        pin: {
            type: String,
            select: false,
        },
        status: String,
        id_number: {
            type: String,
            unique: true,
        },

        created: Date,
        updated: Date,
    },
    { collection: 'users' },
);
