import service from './refresh.service';

import Ash from '../../declarations/application';
import Service from '../../declarations/service';
import { Model } from '../../helpers/model';

export interface Token extends Model {
    token: string;
}

export default (app: Ash): void => {
    const refresh = new Service<Token>(app, {
        name: 'refresh',
    });
    refresh.addservices(service(app));

    app.apply<Token>(refresh);
};
