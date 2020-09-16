import configuration from './configuration';
import mongoose from './mongoose';
import storage from './store';
import services from './services';
import handlers from './handlers';
import assets from './assets';
import authentication from './authentication';

import Ash from './declarations/application';

/*
attaching the necessary callbacks to the express app.
 */
const app = new Ash()
    /*
    setting up configuration for application
     */
    .configure(configuration)
    /*
    setting up mongoose connection to database
     */
    .configure(mongoose)

    /*
    we then add the route that will deal with static resources for the application
     */
    .configure(assets)

    /*
    let us then add the store models into the application as well to connect our storage system...
     */
    .configure(storage)

    /*
    setting up application services
     */
    .configure(services)
    /*
    then we setup the authentication service
     */
    .configure(authentication)
    /*
    one aspect that custom handlers will require is to be placed last
    in the call back declarations defined here. this will create an awkward dependency
    which we will have to figure out in the future.
     */
    .configure(handlers);

export default app;
