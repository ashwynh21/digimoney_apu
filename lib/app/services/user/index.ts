import { Application } from "../../declarations";
import { User } from "./user.class";

export default (app: Application): void => {
    const user = new User(app);

    app.apply(user);
}
