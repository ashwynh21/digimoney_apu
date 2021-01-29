import Ash from '../declarations/application';

export * from './user';
export * from './access';
export * from './refresh';
export * from './wallet';

import user from './user';
import access from './access';
import refresh from './refresh';
import wallet from './wallet';

export default (app: Ash): void => {
    app.configure(user);
    app.configure(access);
    app.configure(refresh);
    app.configure(wallet);
};
