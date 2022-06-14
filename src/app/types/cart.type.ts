
export type Cart = {
    _id?: string,
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
    _id: string;
    image: string;
    price: any;
    title: string;
  };

  export type cartResponseType = {
    responseMessage: "",
    payload: Cart,
    isSucceed: boolean,
    statusCode: number
  }

  export type updateCartRequestType = {
    userId: string,
    productId: string,
    increaseOrDecrease: number
  }


