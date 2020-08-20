import Ash from "../../declarations/application";

import jwt, {TokenExpiredError} from 'jsonwebtoken';
import {Microservices} from '../../declarations';

export = (app: Ash): Microservices<{token: string}> => ({
    '': {
        method: 'post',
        message: 'Hi, here is your new access token!',
        error: 'Oops, access authorization error occurred!',

        /*
        With the authentication function defined and established we can now define functions that allow the requesting
        user to get access tokens as well as refresh tokens.
         */
        callback: async (data : {token: string}) => {
            const settings = app.configuration['authorization'];
            const token = data?.token;

            if (!token) throw Error('Oops, token not found!');

            /*
            declaring token payload here.
             */
            const time = new Date();
            try {
                jwt.verify(token, settings.secret);

                return data;
            } catch (error) {
                if (error instanceof TokenExpiredError) {
                    if ((time.getTime() - error.expiredAt.getTime()) / 1000 > settings.limit)
                        throw error;
                    else {
                        /*
                        so here we expect the payload to have some of the user information, including the user _id.
                        since we will also be sending the user firebase token for update we will need to make sure
                        that we check for it and run an update using the user service.
                         */
                        const payload: Record<string, unknown>
                                = jwt.verify(token, settings.secret,
                                {ignoreExpiration: true}) as unknown as Record<string, unknown>;

                        payload.signature = {
                            iss: 'info@' + app.configuration['host'],
                            sub: 'info@' + app.configuration['host'],
                            aud: app.configuration['host'],
                            iat: Date.now(),
                            exp: Date.now() + settings.expiration
                        };
                        payload.header = {
                            alg: 'HS256',
                            typ: 'JWT',
                        };

                        return {
                            token: jwt.sign(payload, settings.secret, {
                                algorithm: 'HS256',
                            })
                        };
                    }
                } else {
                    throw error;
                }
            }

        }
    }
})
