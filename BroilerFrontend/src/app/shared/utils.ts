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

export function isAfter(date: Date, dateToCompare: Date): boolean {
  console.log(date)
  console.log(dateToCompare)
  if (date.getFullYear() < dateToCompare.getFullYear()) {
    return false;
  } else if (date.getMonth() < dateToCompare.getMonth()) {
    return false;
  } else if (date.getDate() < dateToCompare.getDate()) {
    return false;
  }
  return true;
}

export function isBefore(date: Date, dateToCompare: Date): boolean {
  console.log(date)
  console.log(dateToCompare)
  if (date.getFullYear() > dateToCompare.getFullYear()) {
    return false;
  } else if (date.getMonth() > dateToCompare.getMonth()) {
    return false;
  } else if (date.getDate() > dateToCompare.getDate()) {
    return false;
  }
  return true;
}
