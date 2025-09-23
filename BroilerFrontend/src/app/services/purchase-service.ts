import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Purchase } from '../model/purchase.type';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  http = inject(HttpClient)

  getAllPurchasesFromBackend() {
    return this.http.get<Array<Purchase>>(AppConstants.BASE_URL + "/purchases")
  }

  addNewPurchase(purchase: Purchase) {
    return this.http.post<Array<Purchase>>(AppConstants.BASE_URL + "/purchases", purchase)
  }
}
