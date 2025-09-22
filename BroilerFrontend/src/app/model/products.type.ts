import { ProductType } from "./product-type.type"

export type Product = {
    id?: number,
    start_date: Date,
    type: ProductType,
    price: number
}