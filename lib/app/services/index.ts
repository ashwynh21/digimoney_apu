import {Application} from '../declarations';

export * from './user';
export * from './access';
export * from './refresh';
export * from './recover';

import user from './user';
import access from './access';
import refresh from './refresh';
import recover from './recover';

export default (app: Application): void => {
    app.configure(user);
    app.configure(access);
    app.configure(refresh);
    app.configure(recover);
}
