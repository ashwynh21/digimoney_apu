import Store from '../declarations/store';
import { FeetypeModel, FeetypeSchema } from '../models/feetype.model';
import Ash from '../declarations/application';

import mongoose from 'mongoose';

export class FeetypeStore extends Store<FeetypeModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'feetype',
            storage: FeetypeSchema
        });
    }

    protected oninit(): void {
    }

    protected onmodel(schema: mongoose.Schema): void {
    }

    protected onready(): void {
    }
}
