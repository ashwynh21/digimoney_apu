
import {UserStore} from './user.store';

import {UserModel} from '../models/user.model';
import Ash from '../declarations/application';

export default (app: Ash): void => {
    app.commit<UserModel>(new UserStore(app));
};
