/*
Let us create a base class for socket events and messages, with this base class we want to create a separation between
the socket server, the logic handler on the server, the data on the message, and the actual message itself.

So let us discuss how exactly we are going to layout the structure of the application. Considering the configurable
items, that is, the message name and the default responses.
 */

import io from 'socket.io';
import Ash from './application';

export default abstract class Socket<T> implements SocketInterface {
    /*
    Let us make some more consideration with this class.

    We need to create a good bridge between sockets that includes the considerations that we have made in the above
    discussion. so what we are saying is that we need to establish the connection from the client in a way that the
    server listens for events according to the number of users that are connected.

    So for this to work I believe we need to work in an initializer function that will setup connections dynamically
    as the user connects. This should work like a key lock system for us so that the user connects to the server
    efficiently through some other channel.

    To add more clarity we need to make sure we need to understand what it is that we are doing. So let us start by
    considering the initializer function. since from this class we expect that the socket server is accessible and that
    the HTTP server is up and running we need to have a base set of functions and events that will listen for connection
    establishments. now when the connection is established the socket handler will need to run through a set of
    functionalities for the client connection so that the server starts listening for certain messages along a certain
    chain name on the message object.

    So now, if a user connects, the socket on connect event should fire to configure all the callbacks for that
    connection. this way we can have a dynamic set of message events that work with the application.
     */
    public readonly name: string;

    /*
    Another consideration to make is that when a user connects that connection is represented by as socket, so then
    if we bind or bootstrap the socket with the services needed then we should be able to add any functionality that is
    required of us.

    so now with the socket object in place we should be able to do alot more.
     */
    protected constructor(public client: Client, options: Options) {
        this.name = options.name;

        this.initialize();
    }

    /*
    The first hook that we will be adding is an oncreate hook that will have the socket object in it.
     */
    protected async abstract onready(): Promise<void>;

    /*
    Let us create a function that will allow us to easily emit events using the client object
     */
    protected emit(name: string, message: SocketMessage): boolean {
        return this.client.emit(`${this.name}/${name}`, message);
    }

    /*
    Let us create another function that will allow us to bind in the configuration of the events property to the socket
    events list.
     */
    protected bind(events: { [name: string]: SocketEvent }): void {
        /*
        so here we need to loop through the events interface to allow the functions to be configured to the event.
         */
        Object.entries(events).forEach(([name, event]) => {
            /*
            so with each event we must then bind the function call to the socket and use the name of the event as the
            corresponding event name in the socket connection
             */
            this.client.on(`${this.name}/${name}`, event.callback);
        });
    }

    /*
    let us consider the initialization process of this service class. Since it will be constructed when the user
    connects I suppose it would a matter of introducing the service to the client that has connected, then it will
    begin the process of setting its events onto the socket connection.
     */
    private initialize(): void {
        /*
        so the first thing that we would like to do is bind some bootstrapped data to the socket so that it is easier
        to manage.
        1. With the client object defined the first thing this service will need to do is bind itself to the client
           object. That is, add itself to the services property in the client object
         */
        this.client.apply(this);
        /*
        2. Now from the lifecycle of this service will run in conjunction with the lifecycle of the socket connection.
           so now we need to check for parameters that could have been set into the socket on connection so we can
           parse them.

           since here we may change the actions we perform on this initialization we should add in a hook to allow more
           exact solutions to this initialization

           we have made this hook abstract to allow a forced implementation with it so that the developer handles any
           initialization that may need to be done before any of the events are configured.
         */

        this.onready()
            .catch((error) => this.client.emit(`${this.name}/error`, error));
        /*
        At this point the class should be initialized in terms of properties and should be ready to start binding in
        the configured service function that it has to offer.
        3.  So at this point we must discuss the structure of each channel according to the user. Since the socket
            already represents a single user we need only abstractly bind the user data to this service class or
            to the socket object.
         */

        /*
        after all the events are bound we are going to need a hook to represent that the service is ready. We will call
        it onready.
         */
    }
}

export interface SocketInterface {
    name: string
}

export interface SocketEvent {
    callback: (message: SocketMessage) => unknown | Promise<unknown>
}

interface Options {
    name: string,
    /*
    let us add a field that will allow the
     */
}

export interface SocketMessage {
    data: unknown,

    debug?: unknown,
}

/*
since we will be needing to bootstrap some data to the socket to maintain the service lifecycle and bind them
together let us create an interface for the socket called client which will implement the socket io Socket interface.
This will allow us to add our own methods to the socket connection.
 */
export interface Client extends io.Socket {
    /*
    for now we should only concern binding the service instances to the socket so that they are able to interact
    with each other. It would be ideal to bootstrap the application to the socket then the service will not need
    to hold any context of its own and will instead refer to the client for the application context.
     */
    context: Ash;
    /*
    this method will allow us to set a service to the socket.
     */
    fetch: (service: string) => SocketInterface
    /*
    this method will allow us to get the service back from the socket.
     */
    apply: (service: SocketInterface) => Client

    /*
    so we are going to need a place to store these services since there are no properties that we can reuse
     */
    services: { [name: string]: SocketInterface }

    /*
    let use create a property to hold the meta data provided on connection to the socket server
     */
    meta: unknown
}

/*
Making more considerations we see that decorators in TS may be able to help us with the issue of binding our events
to the socket service class
 */
