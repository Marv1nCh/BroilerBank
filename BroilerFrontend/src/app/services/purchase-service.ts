import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Purchase } from '../model/purchase.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  http = inject(HttpClient)

  getAllPurchasesFromBackend() {
    return this.http.get<Array<Purchase>>(environment.apiPath + "/purchases")
  }

  addNewPurchase(purchase: Purchase) {
    return this.http.post<Array<Purchase>>(environment.apiPath + "/purchases", purchase)
  }

  updatePurchase(purchase: Purchase) {
    return this.http.put<Array<Purchase>>(environment.apiPath + "/purchases", purchase)
  }
}
