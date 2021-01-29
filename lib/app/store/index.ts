import { UserStore } from './user.store';
import { WalletStore } from './wallet.store';

import { UserModel } from '../models/user.model';
import { WalletModel } from '../models/wallet.model';

import Ash from '../declarations/application';
import { WallettypeStore } from './wallettype.store';
import { WallettypeModel } from '../models/wallettype.model';
import { FeetypeStore } from './feetype.store';
import { FeetypeModel } from '../models/feetype.model';

export default (app: Ash): void => {
    app.commit<UserModel>(new UserStore(app));
    app.commit<WalletModel>(new WalletStore(app));
    app.commit<WallettypeModel>(new WallettypeStore(app));
    app.commit<FeetypeModel>(new FeetypeStore(app));
};
