import { AccessService } from './access.class';
import Ash from '../../declarations/application';

export default (app: Ash): void => {
    const access = new AccessService(app);

    app.apply(access);
};
