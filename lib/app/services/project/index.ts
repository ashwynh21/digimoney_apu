
import Ash from '../../declarations/application';
import { ProjectService } from './project.class';

export default (app: Ash): void => {
    const access = new ProjectService(app);

    app.apply(access);
};
