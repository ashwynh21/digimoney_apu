import {Access} from "./access.class";
import {Microservices} from '../../declarations';
import {UserModel} from '../../models/user.model';

export = (access: Access): Microservices<UserModel> => ({
    '': {
        method: 'post',
        message: 'Hi, here is your access token!',
        error: 'Oops, incorrect username or password!',

        /*
        With the authentication function defined and established we can now define functions that allow the requesting
        user to get access tokens as well as refresh tokens.
         */
        callback: (data: UserModel) => access.access(data)
    }
})
