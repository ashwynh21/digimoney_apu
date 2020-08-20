import {Application} from "./declarations";
import {Request, Response} from "express";

import {Return} from './helpers/return';

import constants from './constants';

export = (app: Application): void => {
    /*
    Here we will be configuring handlers that will override the default handlers that are being expressed
    in express. The first express app route that we will be overriding is the 404 error.
     */
    app.use((request: Request, response: Response) => {
        const result: Return<Record<string, unknown>> = {
            message: constants.strings.not_found_error,
            payload: request.body,
            debug: constants.strings.not_found_error,
        };

        return response.status(404).send(result);
    });

    /*
    now we need some way of checking when a request payload is too large and responding with the appropriate
    error.
     */
    app.use((error: { type: string, message: string }, request: Request, response: Response, next: () => unknown) => {
        if(error.type === 'entity.too.large') {
            const result: Return<Record<string, unknown>> = {
                message: constants.strings.too_large_error,
                payload: request.body,
                debug: error.message,
            };

            return response.status(413).send(result);
        }
        return next();
    });
}
