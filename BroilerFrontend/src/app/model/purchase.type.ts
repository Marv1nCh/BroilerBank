export type Purchase = {
    id?: number,
    first_name: String,
    name: String,
    date: Date,
    broiler: number,
    fries: number,
    coleslaw: number,
    paid: boolean,
    total_cost: number,
    due_cost: number
}