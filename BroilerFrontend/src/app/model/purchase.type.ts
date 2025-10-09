export type Purchase = {
  purchaseId?: string;
  givenName: string;
  surname: string;
  date: string;
  products: Array<string>;
  paid: boolean;
  price: number;
};

export function emptyPurchase() {
  return {
    givenName: '',
    surname: '',
    date: '',
    products: [],
    paid: false,
    price: 0,
  };
}
