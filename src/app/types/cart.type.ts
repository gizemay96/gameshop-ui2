
export type Cart = {
    _id: string,
    totalQty: number,
    totalPrice: number,
    products: CartProduct[],
}

export type CartProduct = {
    _id: string,
    totalQty: number,
    totalPrice: number,
    user: string,
    product: ShortProductInfo,
}

export type ShortProductInfo = {
    _id: number;
    image: string;
    price: any;
    title: string;
  };


