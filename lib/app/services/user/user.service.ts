import {UserService} from './user.class';
import {Microservices} from '../../declarations';
import {UserModel} from '../../models/user.model';

export default (user: UserService): Microservices<UserModel> => ({
});
