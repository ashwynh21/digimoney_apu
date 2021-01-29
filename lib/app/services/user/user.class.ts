import { UserModel } from '../../models/user.model';
import { UserStore } from '../../store/user.store';

import Ash from '../../declarations/application';
import Service from '../../declarations/service';

import services from './user.service';

export class UserService extends Service<UserModel> {
    constructor(context: Ash) {
        super(context, {
            name: 'customer',
            store: 'user',
        });

        super.addservices(services(this));
    }

    public authorize(data: Partial<UserModel>): Promise<UserModel> {
        if (!data.cellphone) throw Error('Oops, username is required!');

        return this.context.query<UserModel, UserStore>('user').storage
            .findOne({
                cellphone: data.cellphone,
                pin: data.pin,
            })
            .then((value: UserModel | null) => {
                if (!value) throw Error('Oops, username or password is incorrect!');

                return value;
            });
    }
}
