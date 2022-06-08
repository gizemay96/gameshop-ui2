import { User } from './user.type';

export type authResponse = {
    responseMessage: string,
    payload: authResponsePayload,
    isSucceed: boolean,
    statusCode: number
}

export type authResponsePayload = {
    userDetail: User,
    token: string
}