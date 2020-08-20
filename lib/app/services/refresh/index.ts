
import service from './refresh.service';
import mongoose from 'mongoose';

import Ash from '../../declarations/application';
import Service from '../../declarations/service';

export default (app: Ash): void => {
    interface Token extends mongoose.Document {token: string}

    const refresh = new Service<Token>(app,
        {
            name: 'refresh'
        }
    );
    refresh.addservices(service(app));

    app.apply<Token>(refresh);
}
