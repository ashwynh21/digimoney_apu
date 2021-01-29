import { Model } from '../helpers/model';

import mongoose from 'mongoose';

export interface WalletModel extends Model {
    customer: string;
    type: string;
    balance: number;

    status: string;
}

export const WalletSchema = new mongoose.Schema({
    customer: {
        ref: 'users',
        type: mongoose.Types.ObjectId
    },
    type: String,
    balane: Number,

    status: String,

    created: Date,
    updated: Date,
}, {
    collection: 'wallets'
});
