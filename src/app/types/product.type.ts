
export type Product = {
  _id: string;
  categoryId: string
  description: string;
  image: string;
  imageLogo: string;
  price: number;
  rating: number;
  title: string;
};

export type getProductListRequestType = {
  page: number,
  categoryId: string,
  limit: number,
}

export type getProductsResponseType =
  {
    responseMessage: string,
    payload: {
      products: Product[],
      totalCount: number
    },
    isSucceed: boolean,
    statusCode: number
  }

