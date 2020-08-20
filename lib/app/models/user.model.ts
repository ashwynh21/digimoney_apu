import mongoose from 'mongoose';
import constants from '../constants';

export interface UserModel {
    _id: mongoose.Types.ObjectId | string,
    fullname: string,
    pin?: string,
    mobile: string,
    qrcode: string,
    image?: string,
    secret: string,
    state: 0 | 1 | 2 | 3,
    roles: {
        name: string,
        user: string
    }[],
    updated: Date,
}

export const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Oops, a full name is required'],
    },
    pin: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
        unique: true,
        required: [true, 'Oops, {VALUE} is not a valid mobile!'],
        validate: {
            validator: (mobile: string) => {
                return /(268)?(\+268)?([7])+([689])+([0-9]{6})/.test(mobile);
            },
            message: constants.strings.mobile_invalid
        }
    },
    qrcode: {
        type: String,
    },
    image: {
        type: String,
        required: [true, 'Oops, your image is required!']
    },
    secret: {
        type: String,
    },
    roles: [{
        name: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    state: {
        type: Number,
        default: 0
    },
    updated: {
        type: Date,
        default: new Date()
    },
    __v: {
        type: Number,
        select: false
    },
});
