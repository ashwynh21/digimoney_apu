import {Payload} from './payload';

export interface Return<T> {
    message?: string;
    payload?: Payload<T>;
    debug?: string | Error;
}
