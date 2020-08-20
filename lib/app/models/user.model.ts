import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId | string,
    username: string,
    password: string,
    updated: Date,
}

export const UserSchema = new mongoose.Schema<UserModel>({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    updated: {
        type: Date,
        default: new Date()
    },
    __v: {
        type: Number,
        select: false
    },
}, {collection: 'user'});
