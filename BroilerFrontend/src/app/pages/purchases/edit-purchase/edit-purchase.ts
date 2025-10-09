import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../model/user.type';
import { Purchase } from '../../../model/purchase.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { catchError } from 'rxjs';
import { PurchaseService } from '../../../services/purchase-service';
import { SnackbarService } from '../../../services/components/snackbar-service';
import { mapNamesToUser } from '../../../shared/utils';

@Component({
  selector: '[appEditPurchase]',
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './edit-purchase.html',
  styleUrl: './edit-purchase.scss',
})
export class EditPurchase implements OnInit {
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
  userErrorMessage = 'User has to be filled out!';

  isNewPurchase = input.required<boolean>();
  purchase = input.required<Purchase>();
  users = input.required<Array<User>>();
  foodOptions = input.required<Array<string>>();

  isExited = output<boolean>();
  isSaved = output<boolean>();

  initialUser = signal<User | null>(null);

  ngOnInit(): void {
    this.initialUser.set(
      mapNamesToUser(this.purchase().givenName, this.purchase().surname, this.users())
    );
    this.purchasedAtControl.setValue(new Date(this.purchase().date));
    this.foodOptionControl.setValue(this.purchase().products);
    this.userControl.setValue(this.initialUser());
    this.paidControl.set(this.purchase().paid);
  }

  onSave() {
    const purchasedAt = this.purchasedAtControl.value;
    const user = this.userControl.value;
    const foodOption = this.foodOptionControl.value;

    const isPurchasedAtInvalid = !purchasedAt;
    const isUserInvalid = !user;
    const isFoodOptionInvalid = !foodOption && foodOption!.length > 0;

    this.dateError = isPurchasedAtInvalid;
    this.userError = isUserInvalid;
    this.typeError = isFoodOptionInvalid;

    if (isPurchasedAtInvalid || isUserInvalid || isFoodOptionInvalid) return;

    const isUnchanged =
      !this.isNewPurchase() &&
      purchasedAt.toDateString() == this.purchase().date &&
      user == this.initialUser() &&
      foodOption == this.purchase().products &&
      this.paidControl() == this.purchase().paid;

    if (isUnchanged) {
      this.snackbarService.open('Nothing saved, due to no changes!');
      return;
    }

    if (this.isNewPurchase()) this.addNewPurchase();
    else this.updateExistingPurchase();
  }

  addNewPurchase() {
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
        this.isSaved.emit(true);
        this.exit();
      });
  }

  updateExistingPurchase() {
    const purchaseToUpdate = this.createPurchase();

    this.purchaseService
      .updatePurchase(purchaseToUpdate)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(() => {
        this.snackbarService.open('Purchase has been saved!');
        this.isSaved.emit(true);
        this.exit();
      });
  }

  createPurchase(): Purchase {
    return {
      purchaseId: this.purchase().purchaseId,
      givenName: this.userControl.value!.givenName,
      surname: this.userControl.value!.surname,
      date: this.purchasedAtControl.value!.toDateString(),
      products: this.foodOptionControl.value!,
      paid: this.paidControl(),
      price: 0,
    };
  }

  exit() {
    this.resetValues();
    this.isExited.emit(true);
  }

  resetValues() {
    this.userControl.setValue(null);
    this.foodOptionControl.setValue(null);
    this.paidControl.set(false);
    this.purchasedAtControl.setValue(null);
  }

  disableErrors() {
    this.dateError = false;
    this.userError = false;
    this.typeError = false;
  }
}
