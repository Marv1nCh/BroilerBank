export type Purchase = {
    givenName: string,
    surname: string,
    date: Date,
    products: Array<String>,
    paid: boolean,
    price: number
}