import { Document } from 'mongoose';

export interface Model extends Document {
    created: Date;
    updated: Date;
}
