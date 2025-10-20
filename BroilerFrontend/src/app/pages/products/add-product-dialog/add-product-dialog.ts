import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../services/product-service';
import { SnackbarService } from '../../../services/components/snackbar-service';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { WarningDialog } from '../../../components/warning-dialog/warning-dialog';

export interface DialogProductData {
  allFoodOptions: Array<string>;
}

@Component({
  selector: 'app-add-product-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatIconModule,
    FormsModule,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss',
})
export class AddProductDialog implements OnInit {
  readonly data = inject<DialogProductData>(MAT_DIALOG_DATA);
  allProductOptions = model<Array<string>>(this.data.allFoodOptions);

  productsOptions!: Observable<string[]>;

  productService = inject(ProductService);
  snackbarService = inject(SnackbarService);

  createdAtControl = new FormControl<Date | null>(null);
  type = new FormControl<string | null>(null);
  price = signal<number | null>(null);

  dateError = false;
  dateErrorMessage = 'Date has to be filled in!';
  typeError = false;
  typeErrorMessage = 'Type has to be filled in!';
  priceError = false;
  priceErrorMessage = 'Price has to be filled in!';

  readonly dialogRef = inject(MatDialogRef<AddProductDialog>);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    console.log(this.allProductOptions())
    this.productsOptions = this.type.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  exit() {
    this.dialogRef.close();
  }

  onSave() {
    const createdAt = this.createdAtControl.value;
    const type = this.type.value;
    const price = this.price();

    const isCreatedAtInvalid = !createdAt;
    const isTypeInvalid = !type;
    const isPriceInvalid = !price;

    this.dateError = isCreatedAtInvalid;
    this.typeError = isTypeInvalid;
    this.priceError = isPriceInvalid;

    if (isCreatedAtInvalid || isTypeInvalid || isPriceInvalid) return;

    const product = this.createProduct();
    const dialogRef = this.openWarningDialog();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.addNewProductPrice(product).subscribe(() => {
          this.snackbarService.open('Product has been saved!');

          this.exit();
        });
      }
    });
  }

  disableErrors() {
    this.dateError = false;
    this.typeError = false;
    this.priceError = false;
  }

  createProduct() {
    return {
      startDate: this.createdAtControl.value!.toDateString(),
      type: this.type.value!,
      price: this.price()!,
    };
  }

  openWarningDialog(): MatDialogRef<WarningDialog, any> {
    return this.dialog.open(WarningDialog, {
      autoFocus: false,
      data: {
        warning: 'Are you sure you chose the correct name?',
        message:
          'Changing this to an already existing type is not possible after this. Also changing the Date is not possible after this.',
      },
    });
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProductOptions().filter((option) => option.toLowerCase().includes(filterValue));
  }
}
