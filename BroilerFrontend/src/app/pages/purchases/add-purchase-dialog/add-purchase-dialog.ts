import { Component, inject, model, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PurchaseService } from '../../../services/purchase-service';
import { SnackbarService } from '../../../services/components/snackbar-service';
import { User } from '../../../model/user.type';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { catchError, map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

export interface DialogPurchaseData {
  users: Array<User>;
  foodOptions: Array<string>;
}

@Component({
  selector: 'app-add-purchase-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './add-purchase-dialog.html',
  styleUrl: './add-purchase-dialog.scss',
})
export class AddPurchaseDialog implements OnInit {
  readonly data = inject<DialogPurchaseData>(MAT_DIALOG_DATA);
  purchaseService = inject(PurchaseService);
  snackbarService = inject(SnackbarService);

  purchasedAtControl = new FormControl<Date | null>(null);
  foodOptionControl = new FormControl<string[] | null>(null);
  userControl = new FormControl<User | null>(null);
  paidControl = model(false);

  dateError = false;
  dateErrorMessage = 'Date has to be filled out!';
  typeError = false;
  typeErrorMessage = 'Type has to be filled out!';
  userError = false;
  userErrorMessage = 'User is incorrect!';

  users = model<Array<User>>(this.data.users);
  filteredUsers!: Observable<User[]>;
  foodOptions = model<Array<string>>(this.data.foodOptions);

  readonly dialogRef = inject(MatDialogRef<AddPurchaseDialog>);

  ngOnInit() {
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name =
          typeof value === 'string'
            ? value.toLowerCase()
            : (value?.givenName + ' ' + value?.surname).toLowerCase();
        return this.users().filter((user) =>
          (user.givenName + ' ' + user.surname).toLowerCase().includes(name)
        );
      })
    );
  }

  displayUser(user: User): string {
    return user ? `${user.givenName} ${user.surname}` : '';
  }

  onSave() {
    const purchasedAt = this.purchasedAtControl.value;
    const user = this.userControl.value;
    const foodOption = this.foodOptionControl.value;

    const isPurchasedAtInvalid = !purchasedAt || !purchasedAt!.getDate();
    const isUserInvalid = !user || this.users().indexOf(user!) == -1;
    const isFoodOptionInvalid = !foodOption || foodOption!.length == 0;

    this.dateError = isPurchasedAtInvalid;
    this.userError = isUserInvalid;
    this.typeError = isFoodOptionInvalid;

    if (isPurchasedAtInvalid || isUserInvalid || isFoodOptionInvalid) return;

    const purchaseToCreate = this.createPurchase();

    this.purchaseService
      .addNewPurchase(purchaseToCreate)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(() => {
        this.snackbarService.open('Purchase has been saved!');
        this.exit();
      });
  }

  exit() {
    this.dialogRef.close();
  }

  disableErrors() {
    this.dateError = false;
    this.userError = false;
    this.typeError = false;
  }

  createPurchase() {
    return {
      givenName: this.userControl.value!.givenName!,
      surname: this.userControl.value!.surname!,
      date: this.purchasedAtControl.value!.toDateString(),
      products: this.foodOptionControl.value!,
      paid: this.paidControl(),
      price: 0,
    };
  }
}
