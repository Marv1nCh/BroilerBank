import { Component, inject, model, OnInit, } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { Purchase } from '../../model/purchase.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PurchaseFormula } from '../../components/purchase-formula/purchase-formula';
import { MatIconModule } from '@angular/material/icon';
import { MatSortHeader, MatSortModule, Sort } from "@angular/material/sort";
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchases',
  imports: [MatTableModule, MatIconModule, MatSortModule, 
    MatSortHeader, MatButtonModule, MatDialogModule, 
    MatCheckbox, FormsModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.scss'
})
export class Purchases implements OnInit {
  displayedColumns: string[] = ['givenName', 'surname', 'date', 'products', 'paid', 'Edit']
  purchases = Array<Purchase>()
  paidControl = model(false)
  
  purchaseService = inject(PurchaseService)

  readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    this.initializePurchases()
  }

  initializePurchases() {
    this.purchaseService.getAllPurchasesFromBackend()
      .pipe(catchError((err) => {
        console.log(err)
        throw err;
      }))
        .subscribe((purchasesFromBackend) => {
          this.purchases = purchasesFromBackend
        });
  }

  formatDateToString(date: Date) {
    return new Date(date).toDateString();
  }

  openAddDialog() {
    const dialogref = this.dialog.open(PurchaseFormula, {
      data: {
        update: false,
        purchase: null
      }
    })

    dialogref.afterClosed()
    .subscribe(result => {
      if (result != undefined) {
        this.purchases.push({
          purchaseId: result.purchaseId,
          givenName: result.givenName, 
          surname: result.surname, 
          date: result.date, 
          products:result.products, 
          paid: result.paid, 
          price: result.price})
      }
    })
  }

  openEditDialog(purchase: Purchase){
    const dialogRef = this.dialog.open(PurchaseFormula, {
      data: {
        update: true,
        purchase: purchase
      }
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != undefined) {
          this.initializePurchases()
        }
      })
  }

  onPaidChange(purchase: Purchase) {
    this.purchaseService.updatePurchase(purchase)
      .pipe(catchError((err) => {
            console.log(err)
            throw err;
          }))
      .subscribe()
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction == ''){
      return
    }

    this.purchases.sort((a,b) => {
      const isAsc = sort.direction == 'asc';
      switch(sort.active) {
        case 'firstName':
          return compare(a.givenName, b.givenName, isAsc)
        case 'lastName':
          return compare(a.surname, b.surname, isAsc)
        case 'date':
          return compare(a.date, b.date, isAsc)
        case 'products':
          return compare(a.products.length, b.products.length, isAsc)
        case 'price':
          return compare(a.price, b.price, isAsc)
        default:
          return 0;
      }
    })
  }
}