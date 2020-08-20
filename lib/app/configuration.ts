import {Application} from "./declarations";

import configuration from '../configs/default.json';
import google from '../configs/google-services.json';

export = (app: Application): void => {
    app.set('mongodb', configuration.mongodb);
    app.set('host', configuration.host);
    app.set('assets', configuration.assets);
    app.set('port', configuration.port);
    app.set('public', configuration.public);
    /*
    The authentication configuration settings defines the strategy that will be followed when creating the
    authentication routes. The issue faced here is that the configuration of the application must be loaded
    in before anything is done so that the initializers know what to do. This creates programmatic coupling
    with the rest of the frame structure. This is okay for now but may to be dealt with in the future stage
    of the frame in particular.
     */
    app.set('authorization', configuration?.authorization);

    /*
    Then we configure the information required to get the external APIs such as google and facebook working.
     */
    app.set('google', google);

    /*
    Then we also configure the email information for the mail functions that will be user or could be.
     */
    app.set('mailer', configuration.mailer);

};
