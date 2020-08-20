import Ash from "./declarations/application";

import express from 'express';

export default (app: Ash): void => {
    /*
    in this configuration we will simply be adding the static resources that should be accessible publicly.
    */

    /*
    this function now works, i still need to check how configurable i can go with it.
     */
    app.http?.use('/assets', express.static(`${__dirname}/../assets/`));
}
