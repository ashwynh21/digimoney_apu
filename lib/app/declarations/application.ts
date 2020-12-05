import { Express } from 'express';
import { Model } from '../helpers/model';
import Service from './service';
import Store from './store';

import io from 'socket.io';
import mongoose from 'mongoose';
import multer from 'multer';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compress from 'compression';

export default class Ash implements Application {
    database!: mongoose.Mongoose;
    http!: Express;
    io!: io.Server;

    private services: { [name: string]: <T extends Model>() => Service<T> } = {};
    private stores: { [name: string]: <T extends Model>() => Store<T> } = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public configuration: { [name: string]: any } = {};

    constructor() {
        /*
         * Lets start by instantiating an express app...*/
        this.http = express()
            /*
			lets also make sure that we handle to input maximum size to prevent payload too large errors
			 */
            .use(express.json({ limit: '512kb' }))
            .use(express.urlencoded({ limit: '512kb', extended: true }))
            .use(multer().any())
            /*
			we have to start by settings cors allow cross origin to all first
			 */
            .use(cors())
            /*
			enable security, CORS, compression, favicon and body parsing
			 */
            .use(helmet())
            .use(compress());
    }

    public apply<T extends Model>(service: Service<T>): Service<T> {
        this.services[service.name] = <T extends Model>() => (service as unknown) as Service<T>;

        return service;
    }

    public commit<T extends Model>(store: Store<T>): Store<T> {
        this.stores[store.name] = <T extends Model>() => (store as unknown) as Store<T>;
        return store;
    }

    public fetch<T extends Model>(service: string): Service<T> {
        return this.services[service]();
    }

    public query<T extends Model>(store: string): Store<T> {
        return this.stores[store]();
    }

    public configure(callback: (app: Ash) => void): Ash {
        callback(this);
        return this;
    }

    public authenticate(data: { token: string }): Promise<Record<string, unknown>> {
        /*
         * Lets first make sure that the function is defined properly*/
        if (!this.configuration['authentication']) throw Error('Oops, authentication callback is undefined!');

        return (this.configuration['authentication'] as (data: { token?: string }) => Promise<Record<string, unknown>>)(
            data,
        );
    }
}

interface Application {
    configure: (callback: (app: Ash) => void) => Ash;

    fetch: <T extends Model>(service: string) => Service<T>;
    apply: <T extends Model>(service: Service<T>) => Service<T>;

    commit: <T extends Model>(store: Store<T>) => Store<T>;
    query: <T extends Model>(store: string) => Store<T>;

    authenticate: (data: { token: string }) => Promise<Record<string, unknown>>;

    io: io.Server;
    http: Express;
    database: mongoose.Mongoose;
}
