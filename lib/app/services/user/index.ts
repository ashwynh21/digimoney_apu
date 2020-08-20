
import { User } from "./user.class";
import {UserModel} from '../../models/user.model';

import Ash from '../../declarations/application';

export default (app: Ash): void => {
    const user = new User(app);

    app.apply<UserModel>(user);
}
