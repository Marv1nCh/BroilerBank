import { catchError } from 'rxjs';
import { Purchase } from '../model/purchase.type';
import { User } from '../model/user.type';

export function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a > b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function mapNamesToUser(givenName: string, surname: string, users: Array<User>): User {
  return users.find((user) => {
    return user.givenName == givenName && user.surname == surname;
  })!;
}
