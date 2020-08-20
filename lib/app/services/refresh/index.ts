import {Application} from "../../declarations";
import {Service} from "../../declarations/service";

import service from './refresh.service';

export default (app: Application): void => {
    const refresh = new Service<{token: string}>(app,
        {
            name: 'refresh'
        }
    );
    refresh.addservices(service(app));

    app.apply(refresh);
}
