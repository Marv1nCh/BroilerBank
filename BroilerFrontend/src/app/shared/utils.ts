export function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a > b ? -1 : 1) * (isAsc ? 1 : -1);
}