import { ProductType } from "./product-type.type"

export type Product = {
    id?: number,
    startDate: Date,
    type: ProductType,
    price: number
}