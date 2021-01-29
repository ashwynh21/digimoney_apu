import { Model } from '../helpers/model';

import mongoose from 'mongoose';

export interface WallettypeModel extends Model {
    name: string;
    description: string;
    feetype: string;
}

export const WallettypeSchema = new mongoose.Schema({
    name: String,
    description: String,
    feetype: String,

    created: Date,
    updated: Date,
}, {
    collection: 'wallettypes'
})
