import Store from '../declarations/store';
import { WallettypeModel, WallettypeSchema } from '../models/wallettype.model';
import Ash from '../declarations/application';

import mongoose from 'mongoose';

export class WallettypeStore extends Store<WallettypeModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'wallettype',
            storage: WallettypeSchema
        });
    }

    protected oninit(): void {
    }

    protected onmodel(schema: mongoose.Schema): void {
    }

    protected onready(): void {
    }
}
