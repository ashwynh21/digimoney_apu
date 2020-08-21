/*
This file represents the configuration process of the application system. Here we will describe and implement the
various authentication systems that we wish to offer: to start we will be implementing two basic strategies, that
is, the basic password authentication as well as the jwt authentication.

This functionality of the frame should be something that is easy to change in future especially if we are going to
be changing technology stacks like database storage. This would then require that we re-evaluate being directly
dependent to mongodb.

Another caviat that needs to be considered is how we can use this service to block another service from functioning
if this service has functioned to authenticate the incoming information. One consideration is to add a boolean field
for authentication blocking but this might be overkill and could be implemented in a more subtle approach. A better way
would be to either create a wrapper on the service that will enable authentication with middleware or to allow both
authentication blocking on a service entirely and allowing finer blocking on a single request in a service.
 */

import jwt, {TokenExpiredError} from 'jsonwebtoken';
import constants from './constants';

import Ash from './declarations/application';

/*
Here we describe the different authentication configurations that we can have with especial focus on the jwt
authentication strategy.

In the following objects we will describe the structure of the token and their payloads as well as various
parts concerning the composition of the access token and refresh token.
 */

export default (app: Ash): void => {
    /*
    Now with the settings obtained we can then decide what strategy to follow. With that said let us make the
    configurations required for the basic authentication to work.

    With authentication we require that the entity we wish to authenticate with be able to communicate user
    data. That is, we cannot communicate with the database directly from here but request that the user
    service check and give us the requested answer.

    This way the authentication service then need to know which entity to use for authentication. From the service
    perspective it is prepared to execute an authentication procedure here if the authentication if configured
    into the application or context, thus putting it reach of the service class via the context provided.

    Since the separation of express occurs within the service class we cannot use the application context to
    create authentication requests but we can simply configure the function so that it exists in the context
    and is accessible throughout the application.
     */
    app.configuration['authentication'] = (data: { token?: string }): Promise<Record<string, unknown>> => {
        /*
        Let us make some considerations

        considering that the user will be accessing arbitrary services defined across the application the user
        may not be able to authenticate since they will not be instantiating the service that contains the
        authentication function required here.
         */
        const settings = app.configuration['authorization'];
        const token = data?.token;

        if (!token) throw Error(constants.strings.not_found_token);

        /*
        declaring token payload here
         */
        try {
            return Promise.resolve(jwt.verify(token, settings.secret) as Record<string, unknown>);
        } catch (error) {
            /*
            the authentication here should be lenient if the token is valid but expired
             */
            if (error instanceof TokenExpiredError) {
                return Promise
                    .resolve(jwt.verify(token, settings.secret, {ignoreExpiration: true}) as Record<string, unknown>);
            }

            throw error;
        }
    };
};
