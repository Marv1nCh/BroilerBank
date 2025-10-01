export type Purchase = {
    purchaseId?: string
    givenName: string,
    surname: string,
    date: string,
    products: Array<string>,
    paid: boolean,
    price: number
}