
import {Application} from "./declarations";
import mongoose from 'mongoose';

export = (app: Application): void => {
    mongoose.connect(
        app.get('mongodb'),
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
        .then((connection) => {
            console.info(`mongoose connection established on ${app.get('mongodb')}`);

            return connection;
        })
        .catch((error) => {
            console.error(error);

            process.exit(1);
        });

    mongoose.Promise = global.Promise;

    app.set('mongoose', mongoose);
};
