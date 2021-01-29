import Ash from '../../declarations/application';
import { WalletService } from './wallet.class';
import { WalletModel } from '../../models/wallet.model';


export default (app: Ash): Ash => {
    app.apply<WalletModel, WalletService>(new WalletService(app));

    return app;
}
