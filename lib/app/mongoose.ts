
import mongoose from 'mongoose';
import Ash from './declarations/application';

export = (app: Ash): void => {
    mongoose.connect(
        app.configuration['mongodb'],
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
        .then((connection) => {
            console.info(`mongoose connection established on ${app.configuration['mongodb']}`);

            return connection;
        })
        .catch((error) => {
            console.error(error);

            process.exit(1);
        });

    mongoose.Promise = global.Promise;

    app.configuration['mongoose'] = mongoose;
};
