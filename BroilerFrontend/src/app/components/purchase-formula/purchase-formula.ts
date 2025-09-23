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
import { Purchase } from '../../model/purchase.type';

interface FoodOption {
  label: string;
  value: Partial<Pick<Purchase, 'products'>>;
}

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
  userService = inject(UserService)

  purchasedAtControl = new FormControl(null)
  foodOptionControl = new FormControl<FoodOption[] | null>(null)
  userControl = new FormControl<User | null>(null)
  paidControl = model(false)

  users = Array<User>()
  foodOptions: Array<FoodOption> = [
    {label: "one broiler", value: {}},
    {label: "two broiler", value: {}},
    {label: "one fries", value: {}},
    {label: "two fries", value: {}},
    {label: "coleslaw", value: {}},
    {label: "Krautsalat", value: {}}
  ]

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
  }

  onAdd() {
    if (this.userControl.value != null && this.foodOptionControl.value != null && this.purchasedAtControl.value != null){
      const foodsPurchased = this.foodOptionControl.value
      const first_name = this.userControl.value?.givenName!
      const last_name = this.userControl.value?.surname!
      const date = this.purchasedAtControl.value!
      const paid = this.paidControl()

      const purchaseToCreate = {givenName: first_name, surname: last_name, date: date, 
        products: [], paid: paid}
      
      for (let index = 0; index < foodsPurchased!.length; index++) {
        const foodOption = foodsPurchased![index]
        this.mapFoodInputToPurchase(foodOption, purchaseToCreate)
      }
      
      this.purchaseService.addNewPurchase(purchaseToCreate)
      .subscribe((newPurchase) => {
        this.dialogRef.close(newPurchase);
      })
    }else {
      this.showError = true;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  mapFoodInputToPurchase(foodOption: FoodOption, purchase: Purchase){
    // if(foodOption.value.broiler != undefined){
    //   purchase.broiler += foodOption.value.broiler
    // }
    // else if(foodOption.value.fries != undefined){
    //   purchase.fries += foodOption.value.fries
    // }
    // else if(foodOption.value.coleslaw != undefined) {
    //   purchase.coleslaw += foodOption.value.coleslaw
    // }
  }

}
