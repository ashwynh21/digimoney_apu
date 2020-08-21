import Ash from '../declarations/application';

export * from './user';
export * from './access';
export * from './refresh';

import user from './user';
import access from './access';
import refresh from './refresh';

export default (app: Ash): void => {
    app.configure(user);
};
