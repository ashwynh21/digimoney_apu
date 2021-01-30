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
    'otp': {
        method: 'post',
        message: 'Hi, here is your OTP!',
        error: 'Oops, could not generate OTP!',

        callback: (data: Partial<UserModel>) => access.otp(data),
    },
    'verify': {
        method: 'post',
        message: 'Hi, OTP has been verified!',
        error: 'Oops, OTP was not verified!',

        callback: (data: Partial<UserModel>) => access.verify(data as Partial<UserModel & { otp: string }>),
    },
});
