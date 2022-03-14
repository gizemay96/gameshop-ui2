import { Category } from './category.type';

export type Product = {
  id: number;
  _id: number;
  productId: number;
  name: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  created_at?: string;
  updated_at?: string;
  image: object;
  categories: Category[];
  totalQty: number;
  totalPrice: number;
};