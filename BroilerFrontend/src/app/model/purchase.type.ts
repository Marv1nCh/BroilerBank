export type Purchase = {
    id?: number,
    user_id: number,
    date: Date,
    broiler: number,
    fries: number,
    coleslaw: number,
    paid: boolean
}