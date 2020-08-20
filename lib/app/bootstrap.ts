import {Express} from 'express';
import {Application} from "./declarations";
import {ServiceInterface} from './declarations/service';
import {StoreInterface} from './declarations/store';

export = (app: Express): Application => {
    const application: Application = <Application>app;

    application.authenticate =
            (data: {token: string}) => (application.get('authentication') as (data: {token: string}) =>
                    Promise<Record<string, unknown>>)(data);
    application.configure = (callback: (app: Application) => unknown | Promise<unknown>): Application => {
        callback(application);
        return application;
    };

    application.fetch = (service) => {
        return application.get(service) as ServiceInterface;
    };
    application.apply = (service: ServiceInterface) => {
        application.services[service.name] = service;

        return service;
    };

    application.commit = (store: StoreInterface) => {
        application.stores[store.name] = store;
        return application;
    };
    application.query = (store: string) => {
        return application.stores[store];
    };

    application.services = {};
    application.stores = {};

    return application;
}
