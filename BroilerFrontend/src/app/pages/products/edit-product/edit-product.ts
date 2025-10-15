import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { Product } from '../../../model/products.type';
import { WarningDialog } from '../../../components/warning-dialog/warning-dialog';
import { ProductService } from '../../../services/product-service';
import { SnackbarService } from '../../../services/components/snackbar-service';

@Component({
  selector: '[appEditProduct]',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    AsyncPipe,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct implements OnInit {
  isNewProduct = input.required<boolean>();
  allProductOptions = input.required<Array<string>>();
  product = input.required<Product>();
  isSaved = output<boolean>();
  isExited = output<boolean>();

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

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.createdAtControl.setValue(new Date(this.product().startDate));
    this.type.setValue(this.product().type);
    this.price.set(this.product().price > 0 ? this.product().price : null);

    this.productsOptions = this.type.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );
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

    const isUnchanged =
      !this.isNewProduct() &&
      createdAt.toDateString() == this.product().startDate &&
      type == this.product().type &&
      price == this.product().price;

    if (isUnchanged) {
      this.snackbarService.open('Nothing saved, due to no changes!');
      return;
    }

    this.addProduct();
  }

  addProduct() {
    const product = this.createProduct();
    const dialogRef = this.openWarningDialog();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.addNewProductPrice(product).subscribe(() => {
          this.resetValues();
          this.snackbarService.open('Product has been saved!');
          this.isSaved.emit(true);
          this.exit();
        });
      }
    });
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

  createProduct() {
    return {
      productId: this.product().productId,
      startDate: this.createdAtControl.value!.toDateString(),
      type: this.type.value!,
      price: this.price()!,
    };
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProductOptions().filter((option) => option.toLowerCase().includes(filterValue));
  }

  exit() {
    this.resetValues();
    this.isExited.emit(true);
  }

  resetValues() {
    this.createdAtControl.setValue(null);
    this.type.setValue(null);
    this.price.set(null);
  }

  disableErrors() {
    this.dateError = false;
    this.typeError = false;
    this.priceError = false;
  }
}
