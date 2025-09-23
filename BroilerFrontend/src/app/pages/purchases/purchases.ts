import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { Purchase } from '../../model/purchase.type';
import { catchError } from 'rxjs';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseFormula } from '../../components/purchase-formula/purchase-formula';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-purchases',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.scss'
})
export class Purchases implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'date', 'broiler', 'fries', 'coleslaw', 'paid', 'totalCost', 'dueCost']
  purchases = Array<Purchase>()
  
  purchaseService = inject(PurchaseService)

  readonly dialog = inject(MatDialog)
  @ViewChild('userTable', {static: true, read: MatTable}) table: any

  ngOnInit(): void {
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

  openDialog() {
    const dialogref = this.dialog.open(PurchaseFormula)

    //TODO add error catching
    dialogref.afterClosed()
    .subscribe(result => {
      if (result != undefined) {
        this.purchases.push({firstName: result.firstName, name: result.name, 
          date: result.date, broiler: result.broiler, fries: result.fries, 
          coleslaw: result.coleslaw, paid: result.paid, totalCost: result.totalCost, 
          dueCost: result.dueCost})
        this.table.renderRows()
      }
    })
  }
}
