import { Component, inject, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { Purchase } from '../../model/purchase.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-purchases',
  imports: [MatTableModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.scss'
})
export class Purchases implements OnInit {
  displayedColumns: string[] = ['user_id', 'date', 'broiler', 'fries', 'coleslaw', 'paid']
  purchaseService = inject(PurchaseService)
  purchases = Array<Purchase>()

  ngOnInit(): void {
    this.purchaseService.getAllPurchasesFromBackend()
    .pipe(catchError((err) => {
      console.log(err)
      throw err;
    }))
    .subscribe((purchasesFromBackend) => {
      this.purchases = purchasesFromBackend
    })
  }
}
