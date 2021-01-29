import { Model } from '../helpers/model';

import mongoose from 'mongoose';

export interface FeetypeModel extends Model {
    name: string;
    receive_fee: number;
    sending_fee: number;
    deposit_fee: number;
    widthdraw_fee: number;
}

export const FeetypeSchema = new mongoose.Schema({
    name: String,
    receive_fee: Number,
    sending_fee: Number,
    deposit_fee: Number,
    widthdraw_fee: Number,
}, { collection: 'feetypes' })
