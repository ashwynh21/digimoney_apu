
import mongoose from 'mongoose';
import Ash from './declarations/application';

export = async (app: Ash): Promise<void> => {
    app.database = await mongoose.connect(
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
};
