import Ash from "./declarations/application";

import configuration from '../configs/default.json';

export default (app: Ash): void => {
    app.configuration['mongodb'] = configuration.mongodb;
    app.configuration['host'] = configuration.host;
    app.configuration['port'] = configuration.port;
    app.configuration['assets'] = configuration.assets;
    app.configuration['public'] = configuration.public;
    /*
    The authentication configuration settings defines the strategy that will be followed when creating the
    authentication routes. The issue faced here is that the configuration of the application must be loaded
    in before anything is done so that the initializers know what to do. This creates programmatic coupling
    with the rest of the frame structure. This is okay for now but may to be dealt with in the future stage
    of the frame in particular.
     */
    app.configuration['authorization'] = configuration?.authorization;

};
