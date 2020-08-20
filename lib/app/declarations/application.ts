import { Express } from 'express';
import { ServiceInterface } from './service';
import { StoreInterface } from './store';

import http from 'http';
import io from 'socket.io';
import mongoose from "mongoose";

export interface Application extends Express {
    configure: (callback: (app: Application) => void) => Application;

    fetch: (service: string) => ServiceInterface;
    apply: (service: ServiceInterface) => ServiceInterface;

    commit: (store: StoreInterface) => Application;
    query: (store: string) => StoreInterface;

    authenticate: (data: {token: string}) => Promise<Record<string, unknown>>;

    io: io.Server;
    http: http.Server;
    database: mongoose.Mongoose;

    /*
    here we need to keep variables on how the different configurations, sockets and configurations are kept...
     */
    services: {[name: string]: ServiceInterface};
    stores: {[name: string]: StoreInterface};
}
