import { Component, inject, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { emptyPurchase, Purchase } from '../../model/purchase.type';
import { catchError } from 'rxjs';
import { MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { User } from '../../model/user.type';
import { ProductService } from '../../services/product-service';
import { UserService } from '../../services/user-service';
import { SnackbarService } from '../../services/components/snackbar-service';
import { EditPurchase } from './edit-purchase/edit-purchase';
import { sortPurchaseData } from '../../shared/sort-utils';
import { FilterCardPurchases } from './components/filter-card-purchases/filter-card-purchases';
import { WarningDialog } from '../../components/warning-dialog/warning-dialog';
import { compare } from '../../shared/utils';

@Component({
  selector: 'app-purchases',
  imports: [
    MatIconModule,
    MatSortModule,
    MatDialogContent,
    MatCheckbox,
    EditPurchase,
    FilterCardPurchases,
  ],
  templateUrl: './purchases.html',
  styleUrl: './purchases.scss',
})
export class Purchases implements OnInit {
  purchases = Array<Purchase>();
  filteredPurchases = Array<Purchase>();
  foodOptions: Array<string> = [];
  users = Array<User>();

  emptyPurchase = emptyPurchase();

  purchaseService = inject(PurchaseService);
  productService = inject(ProductService);
  userService = inject(UserService);
  snackbarService = inject(SnackbarService);

  currentlyEditingId: string | null = null;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.initializePurchases();

    this.userService
      .getAllUsersFromBackend()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((usersFromBackend) => {
        this.users = usersFromBackend.sort((a, b) =>
          compare(a.givenName + ' ' + a.surname, b.givenName + ' ' + b.surname, false)
        );
      });

    this.productService
      .getUniqueProductsFromBackend()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((uniqueProductsFromBackend) => {
        this.foodOptions = uniqueProductsFromBackend.map((product) => product.type);
      });
  }

  initializePurchases() {
    this.purchaseService.getAllPurchasesFromBackend().subscribe((purchasesFromBackend) => {
      this.purchases = purchasesFromBackend;
      this.filteredPurchases = this.purchases;

      this.sortData({ active: 'date', direction: 'asc' });
    });
  }

  formatDateToString = (date: Date) => new Date(date).toDateString();

  onPaidChange(purchase: Purchase) {
    const updatedPurchase: Purchase = {
      ...purchase,
      paid: !purchase.paid,
    };

    this.purchaseService
      .updatePurchase(updatedPurchase)
      .subscribe(() => (purchase.paid = updatedPurchase.paid));
  }

  onDelete(purchaseId: string) {
    const dialogRef = this.openWarningDialog();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.purchaseService.deletePurchase(purchaseId).subscribe(() => {
          this.snackbarService.open('Purchase deleted successfully!');
          this.initializePurchases();
        });
      }
    });
  }

  openWarningDialog(): MatDialogRef<WarningDialog, any> {
    return this.dialog.open(WarningDialog, {
      autoFocus: false,
      data: {
        warning: 'Are you sure you want to delete this purchase?',
        message: 'Choosing proceed will delete this purchase forever!',
      },
    });
  }

  onCancelEdit = () => (this.currentlyEditingId = null);

  onEdit = (newCurrentlyEditingId: string) => (this.currentlyEditingId = newCurrentlyEditingId);

  applyDateRangeFilter = (newlyFilteredPurchases: Array<Purchase>) =>
    (this.filteredPurchases = newlyFilteredPurchases);

  sortData = (sort: Sort) => sortPurchaseData(sort, this.filteredPurchases);

  onSearch = (searchedPurchases: Array<Purchase>) => (this.filteredPurchases = searchedPurchases);
}
