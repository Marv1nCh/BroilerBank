import { Component, inject, model, OnInit, } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { Purchase } from '../../model/purchase.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from "@angular/material/sort";
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { User } from '../../model/user.type';
import { ProductService } from '../../services/product-service';
import { UserService } from '../../services/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchases',
  imports: [MatTableModule, MatIconModule, MatSortModule, MatButtonModule,
    MatDialogModule, MatFormField, MatLabel, MatInputModule, MatDatepicker,
    ReactiveFormsModule, MatDialogContent, MatDatepickerModule, MatSelectModule, 
    MatAutocompleteModule, MatCheckbox, FormsModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.scss'
})
export class Purchases implements OnInit {
  constructor(private snackBar: MatSnackBar) {}

  purchases = Array<Purchase>()  
  foodOptions: Array<string> = []
  users = Array<User>()

  purchaseService = inject(PurchaseService)
  productService = inject(ProductService)
  userService = inject(UserService)

  purchasedAtControl = new FormControl<Date | null>(null)
  foodOptionControl = new FormControl<string[] | null>(null)
  userControl = new FormControl<User | null>(null)
  paidControl = model(false)

  dateError = false
  dateErrorMessage = "Date has to be filled out!"
  typeError = false
  typeErrorMessage = "Type has to be filled out!"
  userError = false
  userErrorMessage = "User has to be filled out!"

  purchasedAtControlEdit = new FormControl<Date | null>(null)
  foodOptionControlEdit = new FormControl<string[] | null>(null)
  paidControlEdit = model(false)

  currentlyEditingId: string | null = null
  rowBeingEdited: Purchase | null = null

  readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    this.initializePurchases()

    this.userService.getAllUsersFromBackend()
    .pipe(catchError((err) => {
          console.log(err);
          throw err;
        }))
        .subscribe((usersFromBackend) => {
          this.users = usersFromBackend
        })

    this.productService.getUniqueProductsFromBackend()
      .pipe(catchError((err) => {
            console.log(err);
            throw err;
          }))
          .subscribe((uniqueProductsFromBackend) => {
            this.foodOptions = uniqueProductsFromBackend.map(product => product.type)
      })
  }

  initializePurchases() {
    this.purchaseService.getAllPurchasesFromBackend()
      .pipe(catchError((err) => {
        console.log(err)
        throw err;
      }))
        .subscribe((purchasesFromBackend) => {
          this.purchases = purchasesFromBackend

          this.sortData({active: 'date', direction: 'asc'})
        });
  }

  formatDateToString(date: Date) {
    return new Date(date).toDateString();
  }

  onPaidChange(purchase: Purchase) {
    this.purchaseService.updatePurchase(purchase)
      .pipe(catchError((err) => {
            console.log(err)
            throw err;
          }))
      .subscribe()
  }

  onSaveNewPurchase() {
    const purchasedAt = this.purchasedAtControl.value
    const user = this.userControl.value
    const foodOption = this.foodOptionControl.value

    if(purchasedAt == null) {
      this.dateError = true
    }
    if(user == null) {
      this.userError = true
    }
    if(foodOption == null) {
      this.typeError = true
    }

    if (purchasedAt != null && user != null && foodOption != null) {
          const purchaseToCreate = {
            givenName: user.givenName, 
            surname: user.surname, 
            date: purchasedAt.toDateString(), 
            products: foodOption, 
            paid: this.paidControl(), 
            price: 0
          }
          this.purchaseService.addNewPurchase(purchaseToCreate)
            .pipe(catchError((err) => {
              console.log(err)
              throw err;
            }))
            .subscribe(() => { 
              this.initializePurchases()
              this.userControl.setValue(null)
              this.foodOptionControl.setValue(null)
              this.paidControl.set(false)
              this.purchasedAtControl.setValue(null)
            })
            this.openSnackBar("Purchase has been saved!")
    }
  }

  onSaveEdit(purchase: Purchase) {
    const purchasedAt = this.purchasedAtControlEdit.value
    const foodOption = this.foodOptionControlEdit.value

    if(purchasedAt == null) {
      this.dateError = true
    }
    else if(foodOption == null) {
      this.typeError = true
    }
    else if (purchasedAt.toDateString() == this.rowBeingEdited?.date && 
              foodOption == this.rowBeingEdited.products && 
                this.paidControlEdit() == this.rowBeingEdited.paid) {
      this.openSnackBar("Nothing saved, due to no changes!")

      this.resetEditingValues()
    }

    else {
          const purchaseToUpdate = {
            purchaseId: purchase.purchaseId,
            givenName: purchase.givenName, 
            surname: purchase.surname, 
            date: purchasedAt.toDateString(), 
            products: foodOption, 
            paid: this.paidControlEdit(), 
            price: 0
          }
          this.purchaseService.updatePurchase(purchaseToUpdate)
            .pipe(catchError((err) => {
              console.log(err)
              throw err;
            }))
            .subscribe(() => { 
              this.initializePurchases()
              this.resetEditingValues()
            })          

            this.openSnackBar("Purchase has been updated!")

            this.resetEditingValues()
    }
  }

  addPurchase(purchase: Purchase) {
  this.purchaseService.addNewPurchase(purchase)
    .pipe(catchError((err) => {
      console.log(err)
      throw err;
    }))
    .subscribe(() => { 
      this.initializePurchases()
      this.userControl.setValue(null)
      this.foodOptionControl.setValue(null)
      this.paidControl.set(false)
      this.purchasedAtControl.setValue(null)
    })
  }

  onCancelEdit() {
    if(this.rowBeingEdited != null) {
      const purchaseIndex = this.purchases.findIndex( purchase => purchase.purchaseId == this.currentlyEditingId)
      this.purchases[purchaseIndex] = this.rowBeingEdited

      this.resetEditingValues()
    }
  }

  resetEditingValues() {
    this.purchasedAtControlEdit.setValue(null)
    this.foodOptionControlEdit.setValue(null)
    this.paidControlEdit.set(false)

    this.currentlyEditingId = null
    this.rowBeingEdited = null
  }

  onEdit(newCurrentlyEditingId: string){
    if(this.rowBeingEdited != null) {
      const purchaseIndex = this.purchases.findIndex(purchase => purchase.purchaseId == this.currentlyEditingId)
      this.purchases[purchaseIndex] = this.rowBeingEdited
    }

    const newPurchaseBeingEdited = this.purchases.find(purchase => purchase.purchaseId == newCurrentlyEditingId)
    if (newPurchaseBeingEdited != null) {
      this.rowBeingEdited = newPurchaseBeingEdited
      this.currentlyEditingId = newPurchaseBeingEdited.purchaseId!

      this.purchasedAtControlEdit.setValue(new Date(newPurchaseBeingEdited.date))
      this.foodOptionControlEdit.setValue(newPurchaseBeingEdited.products)
      this.paidControlEdit.set(newPurchaseBeingEdited.paid)
    }
  }

  disableErrors() {
    this.dateError = false
    this.userError = false
    this.typeError = false
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

  openSnackBar (message: string) {
    this.snackBar.open(message, "close")
  }
}