import app from '../app/app';
import socketio from '../app/socketio';
import http from 'http';
import config from '../../package.json';

process.title = config.name

const port = process.env.PORT || app.get('port');

app.http = http.createServer(app);
/*
Somewhere here we need to add the code that will handle unknown responses or 404 errors. Since this is a json
framework we will provide the response in a json format. Additionally to overriding the functionality of not
found responses we will also have to provide a way of interfacing the response in the upper layers of the frame.
 */
process.on('unhandledRejection', (reason, p) =>
    console.error('unhandled rejection at: promise ', p, reason));

app.http.on('listening', () =>
    console.info('application started on http://%s:%d', app.get('host'), port));

app
    .configure(socketio);

app.http.listen(port);
