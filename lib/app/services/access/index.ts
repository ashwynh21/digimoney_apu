
import {Access} from "./access.class";
import Ash from '../../declarations/application';

export default (app: Ash): void => {
    const access = new Access(app);

    app.apply(access);
}
