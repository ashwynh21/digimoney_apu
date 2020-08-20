import { Application } from './declarations';

import express from 'express';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import multer from 'multer';

import bootstrap from './bootstrap';
import configuration from './configuration';
import mongoose from './mongoose';
import storage from './store';
import services from './services';
import handlers from './handlers';
import assets from './assets';
import authentication from './authentication';

/*
attaching the necessary callbacks to the express app.
 */
const app: Application = bootstrap(express())
    /*
    lets also make sure that we handle to input maximum size to prevent payload too large errors
     */
    .use(express.json({limit: '512kb'}))
    .use(express.urlencoded({limit: '512kb', extended: true}))
    .use(multer().any())
    /*
    we have to start by settings cors allow cross origin to all first
     */
    .use(cors())
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
    .configure(handlers)

    /*
    enable security, CORS, compression, favicon and body parsing
     */
    .use(helmet())
    .use(compress());

export default app;
