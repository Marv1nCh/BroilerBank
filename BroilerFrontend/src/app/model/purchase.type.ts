export type Purchase = {
    id?: number,
    firstName: string,
    name: string,
    date: Date,
    broiler: number,
    fries: number,
    coleslaw: number,
    paid: boolean,
    totalCost?: number,
    dueCost?: number
}