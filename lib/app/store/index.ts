import { UserStore } from './user.store';
import { WalletStore } from './wallet.store';

import { UserModel } from '../models/user.model';
import { WalletModel } from '../models/wallet.model';

import Ash from '../declarations/application';

export default (app: Ash): void => {
    app.commit<UserModel>(new UserStore(app));
    app.commit<WalletModel>(new WalletStore(app));
};
