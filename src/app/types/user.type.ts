import { Cart } from './cart.type';
import { Address } from './address.type';

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  cart?: Cart | number;
  phoneNumber?: string;
  address?: Address;
  // below fields are coming from register response
  _id?: string,
  password: string,
  createdAt: string,
  updatedAt: string,
  __v: 0
};

export type userEditRequestType = {
  firstName: string,
  email: string,
  phoneNumber: string,
  id: string,
}

export type userEditResponseType = {
  responseMessage: string,
  payload: User,
  isSucceed: boolean,
  statusCode: number
}