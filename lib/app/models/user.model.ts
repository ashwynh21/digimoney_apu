import { Document, Schema } from 'mongoose';

export interface UserModel extends Document {
    username: string;
    password: string;

    access: Array<string>;

    updated: Date;
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

        access: [String],
    },
    { collection: 'user' },
);
