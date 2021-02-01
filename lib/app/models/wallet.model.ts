import { Model } from '../helpers/model';

import mongoose from 'mongoose';

export interface WalletModel extends Model {
    customer: string;
    type: string;
    balance: number;
    name: string;

    status: string;
}

export const WalletSchema = new mongoose.Schema({
    customer: {
        ref: 'users',
        type: mongoose.Types.ObjectId
    },
    type: String,
    balane: Number,
    name: String,

    status: String,

    created: Date,
    updated: Date,
}, {
    collection: 'wallets'
});
