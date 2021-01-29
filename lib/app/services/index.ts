import Ash from '../declarations/application';

export * from './user';
export * from './access';
export * from './refresh';
export * from './wallet';
export * from './wallettype';
export * from './feetype';

import user from './user';
import access from './access';
import refresh from './refresh';
import wallet from './wallet';
import wallettype from './wallettype';
import feetype from './feetype';

export default (app: Ash): void => {
    app.configure(user);
    app.configure(access);
    app.configure(refresh);
    app.configure(wallet);
    app.configure(wallettype);
    app.configure(feetype);
};
