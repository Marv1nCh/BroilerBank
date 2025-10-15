import { User } from '../model/user.type';

export function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a > b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function mapNamesToUser(givenName: string, surname: string, users: Array<User>): User {
  return users.find((user) => {
    return user.givenName == givenName && user.surname == surname;
  })!;
}

export function mapDateToString(date: Date) {
  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')
  );
}
