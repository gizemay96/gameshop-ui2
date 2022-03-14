import { User } from './user.type';

export type AuthResponse = {
    payload: {
        token: string,
        userDetail: User
    }
    isSucceed: boolean
}