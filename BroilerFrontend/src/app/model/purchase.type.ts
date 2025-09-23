export type Purchase = {
    id?: number,
    firstName: String,
    name: String,
    date: Date,
    broiler: number,
    fries: number,
    coleslaw: number,
    paid: boolean,
    totalCost?: number,
    dueCost?: number
}