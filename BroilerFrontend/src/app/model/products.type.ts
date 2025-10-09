export type Product = {
  productId?: string;
  startDate: string;
  type: string;
  price: number;
};

export function createEmptyProduct() {
  return {
    startDate: '',
    type: '',
    price: 0,
  };
}
