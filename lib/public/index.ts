import app from '../app/app';
import socketio from '../app/socketio';
import http from 'http';
import config from '../../package.json';

process.title = config.name

const port = process.env.PORT || app.configuration['port'];

const server = http.createServer(app.http);
/*
Somewhere here we need to add the code that will handle unknown responses or 404 errors. Since this is a json
framework we will provide the response in a json format. Additionally to overriding the functionality of not
found responses we will also have to provide a way of interfacing the response in the upper layers of the frame.
 */
process.on('unhandledRejection', (reason, p) =>
    console.error('unhandled rejection at: promise ', p, reason));

server.on('listening', () =>
    console.info('application started on http://%s:%d', app.configuration['host'], port));

app
    .configure((app) => socketio(app, server));

server.listen(port);
