import { Cart } from './cart.type';
import { Address } from './address.type';

export type User = {
  id: number;
  _id: number;
  username: string;
  firstName: string;
  fullname?:string;
  lastName:string;
  email: string;
  cart?: Cart | number;
  phone?:string;
  address?: Address;
  avatar?: any;
  avatarUrl?: string;
};