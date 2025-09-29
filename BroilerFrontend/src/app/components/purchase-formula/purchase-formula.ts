import { Component, inject, model, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
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
  dialogRef = inject(MatDialogRef<PurchaseFormula>)
  purchaseService = inject(PurchaseService)
  productService = inject(ProductService)
  userService = inject(UserService)

  purchasedAtControl = new FormControl(null)
  foodOptionControl = new FormControl<string[] | null>(null)
  userControl = new FormControl<User | null>(null)
  paidControl = model(false)

  users = Array<User>()
  foodOptions: Array<string> = []

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

  onAdd() {
    const user = this.userControl.value
    const foodOption = this.foodOptionControl.value
    const purchasedAt = this.purchasedAtControl.value

    if (user == null  || foodOption == null || purchasedAt == null){
      this.showError = true;
    }else{
      const foodsPurchased = this.foodOptionControl.value!
      const first_name = this.userControl.value?.givenName!
      const last_name = this.userControl.value?.surname!
      const date = this.purchasedAtControl.value!
      const paid = this.paidControl()

      const purchaseToCreate = {
        givenName: first_name, 
        surname: last_name, 
        date: date, 
        products: foodsPurchased, 
        paid: paid, 
        price: 0
      }
      
      this.purchaseService.addNewPurchase(purchaseToCreate)
        .subscribe((newPurchase) => {
          this.dialogRef.close(newPurchase);
        })
    }
  }
 
  onCancel() {
    this.dialogRef.close();
  }
}
