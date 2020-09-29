import { UserStore } from './user.store';
import { ProjectStore } from './project.store';

import { UserModel } from '../models/user.model';
import { ProjectModel } from '../models/project.model';

import Ash from '../declarations/application';

export default (app: Ash): void => {
    app.commit<UserModel>(new UserStore(app));
    app.commit<ProjectModel>(new ProjectStore(app));
};
