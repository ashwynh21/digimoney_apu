export interface Return<T> {
    message?: string;
    payload?: T | Array<T>;
    debug?: string | Error;
}
