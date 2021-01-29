import Store from '../declarations/store';
import Ash from '../declarations/application';

import { WalletModel, WalletSchema } from '../models/wallet.model';

import mongoose from 'mongoose';

export class WalletStore extends Store<WalletModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'wallet',
            storage: WalletSchema
        });
    }

    protected oninit(): void {
        /**/
    }

    protected onmodel(schema: mongoose.Schema): void {
        /**/
    }

    protected onready(): void {
        /**/
    }
}
