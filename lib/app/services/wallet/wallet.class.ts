import { WalletModel } from '../../models/wallet.model';
import Service from '../../declarations/service';
import Ash from '../../declarations/application';


export class WalletService extends Service<WalletModel> {
    constructor(app: Ash) {
        super(app, {
            name: 'wallet',
            store: 'wallet'
        });
    }
}
