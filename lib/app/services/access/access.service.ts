import { AccessService } from './access.class';
import { Microservices } from '../../declarations';
import { UserModel } from '../../models/user.model';

export default (access: AccessService): Microservices<UserModel> => ({
    '': {
        method: 'post',
        message: 'Hi, here is your access token!',
        error: 'Oops, incorrect username or password!',

        callback: (data: Partial<UserModel>) => access.access(data),
    },
});
