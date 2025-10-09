import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Purchase } from '../model/purchase.type';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  http = inject(HttpClient);

  getAllPurchasesFromBackend() {
    return this.http.get<Array<Purchase>>(environment.apiPath + '/purchases').pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  addNewPurchase(purchase: Purchase) {
    return this.http.post<Array<Purchase>>(environment.apiPath + '/purchases', purchase).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  updatePurchase(purchase: Purchase) {
    return this.http.put<Array<Purchase>>(environment.apiPath + '/purchases', purchase).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }
}
