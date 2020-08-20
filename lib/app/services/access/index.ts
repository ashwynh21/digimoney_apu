import {Application} from "../../declarations";
import {Access} from "./access.class";

export default (app: Application): void => {
    const access = new Access(app);

    app.apply(access);
}
