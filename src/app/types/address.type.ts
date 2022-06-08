export type Address = {
    _id: string
    building: string,
    city: string,
    country: string,
    street: string,
    title: string,
    userId: string,
    createdAt: string
    updatedAt: string
}

export type addressResponseType = {
    responseMessage: string,
    payload: Address[],
    isSucceed: boolean,
    statusCode: number
  }