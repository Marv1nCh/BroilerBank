import { Sort } from '@angular/material/sort';
import { compare } from './utils';
import { Purchase } from '../model/purchase.type';
import { User } from '../model/user.type';

export function sortPurchaseData(sort: Sort, purchases: Array<Purchase>) {
  if (!sort.active || sort.direction == '') {
    return;
  }

  purchases.sort((a, b) => {
    const isAsc = sort.direction == 'asc';
    switch (sort.active) {
      case 'name':
        return compare(a.givenName + " " + a.surname, b.givenName + " " + b.surname, isAsc);
      case 'date':
        return compare(new Date(a.date), new Date(b.date), isAsc);
      case 'products':
        return compare(a.products.length, b.products.length, isAsc);
      case 'price':
        return compare(a.price, b.price, isAsc);
      default:
        return 0;
    }
  });
}

export function sortUserData(sort: Sort, users:Array<User>) {
    if (!sort.active || sort.direction == '') {
      return;
    }

    users.sort((a, b) => {
      const isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'firstName':
          return compare(a.givenName, b.givenName, isAsc);
        case 'name':
          return compare(a.surname, b.surname, isAsc);
        default:
          return 0;
      }
    });
  }
