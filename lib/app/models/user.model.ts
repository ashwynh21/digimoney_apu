import { Schema } from 'mongoose';
import { Model } from '../helpers/model';
import mongoose from 'mongoose';

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
}

export const UserSchema = new Schema(
    {
        firstname: String,
        middlename: String,
        lastname: String,
        gender: String,
        dob: Date,
        image: mongoose.Types.Buffer,
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
