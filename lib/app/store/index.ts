
import {UserStore} from './user.store';
import {Application} from '../declarations';
import {StoreInterface} from '../declarations/store';

export default (app: Application): void => {
    const stores: Array<StoreInterface> = [];

    stores.push(new UserStore(app));


    stores.forEach((store) => {
        app.stores[store.name] = store;
    });
}
