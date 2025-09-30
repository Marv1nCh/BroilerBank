import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PurchaseService } from '../../services/purchase-service';
import { UserService } from '../../services/user-service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/user.type';
import { catchError } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-purchase-formula',
  imports: [MatDialogContent, MatFormField, MatLabel, 
    MatDialogActions, FormsModule, MatInputModule, 
    MatDatepickerModule, MatOption, ReactiveFormsModule, 
    MatSelectModule, MatCheckbox],
  templateUrl: './purchase-formula.html',
  styleUrl: './purchase-formula.scss'
})
export class PurchaseFormula implements OnInit{
    data = inject(MAT_DIALOG_DATA) as {
    update: boolean,
    purchasedAt: Date,
    foodOptions: string[],
    givenName: string,
    surname: string,
    paid: boolean,
    purchaseId: string
  };

  dialogRef = inject(MatDialogRef<PurchaseFormula>)
  purchaseService = inject(PurchaseService)
  productService = inject(ProductService)
  userService = inject(UserService)

  purchasedAtControl = new FormControl<string | null>(null)
  foodOptionControl = new FormControl<string[] | null>(null)
  userControl = new FormControl<User | null>(null)
  paidControl = model(false)

  users = Array<User>()
  foodOptions: Array<string> = []

  purchaseId = ""

  showError = false
  errorMessage = "All fields need to be filled in!"

  ngOnInit(): void {
    this.userService.getAllUsersFromBackend()
    .pipe(catchError((err) => {
          console.log(err);
          throw err;
        }))
        .subscribe((usersFromBackend) => {
          this.users = usersFromBackend
          const user = this.users.find(user => user.givenName === this.data.givenName && user.surname === this.data.surname)
          this.userControl.setValue(user!)
        })

    this.productService.getUniqueProductsFromBackend()
      .pipe(catchError((err) => {
            console.log(err);
            throw err;
          }))
          .subscribe((uniqueProductsFromBackend) => {
            this.foodOptions = uniqueProductsFromBackend.map(product => product.type)
          })

      if(this.data.update) {
        this.purchasedAtControl.setValue(this.data.purchasedAt.toString())
        this.foodOptionControl.setValue(this.data.foodOptions)
        this.paidControl.set(this.data.paid)
        this.purchaseId = this.data.purchaseId
      }
    }

  onAdd() {
    const user = this.userControl.value
    const foodOption = this.foodOptionControl.value
    const purchasedAt = this.purchasedAtControl.value

    if (user == null  || foodOption == null || purchasedAt == null){
      this.showError = true;
    }else{
      const purchasedAtDate = this.data.update ? purchasedAt : purchasedAt
      const paid = this.paidControl()

      const purchaseToCreate = {
       purchaseId: this.purchaseId,
        givenName: user.givenName, 
        surname: user.surname, 
        date: purchasedAtDate, 
        products: foodOption, 
        paid: paid, 
        price: 0
      }

      if(this.data.update) {
        this.purchaseService.updatePurchase(purchaseToCreate)
          .subscribe((updatedPurchase) => {
            this.dialogRef.close(updatedPurchase);
        })
      }else {
        this.purchaseService.addNewPurchase(purchaseToCreate)
          .subscribe((newPurchase) => {
            this.dialogRef.close(newPurchase);
          })
      }
    }
  }
 
  onCancel() {
    this.dialogRef.close();
  }
}
