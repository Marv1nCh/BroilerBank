import { Component, inject, OnInit, } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { Purchase } from '../../model/purchase.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseFormula } from '../../components/purchase-formula/purchase-formula';
import { MatIconModule } from '@angular/material/icon';
import { MatSortHeader, MatSortModule, Sort } from "@angular/material/sort";
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-purchases',
  imports: [MatTableModule, MatIconModule, MatSortModule, MatSortHeader, MatButtonModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.scss'
})
export class Purchases implements OnInit {
  displayedColumns: string[] = ['givenName', 'surname', 'date', 'products', 'paid', 'Edit']
  purchases = Array<Purchase>()
  
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
        purchasedAt: null,
        givenName: null,
        surname: null,
        foodOptions: null,
        paid: null,
        purchaseId: null
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

  openEditDialog(purchasedAt: string, givenName: string, surname:string, foodOptions: Array<string>, paid:boolean, purchaseId: string){
    const dialogRef = this.dialog.open(PurchaseFormula, {
      data: {
        update: true,
        purchasedAt: purchasedAt,
        givenName: givenName,
        surname: surname,
        foodOptions: foodOptions,
        paid: paid,
        purchaseId: purchaseId
      }
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != undefined) {
          this.initializePurchases()
        }
      })
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
        default:
          return 0;
      }
    })
  }
}