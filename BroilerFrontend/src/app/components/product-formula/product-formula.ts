import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../model/products.type';
import { MatButtonModule } from '@angular/material/button';
import { catchError, map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-formula',
  imports: [MatDialogContent, MatFormField, MatLabel, 
    MatDialogActions, FormsModule, MatInputModule, 
    MatDatepickerModule, ReactiveFormsModule, MatSelectModule,
    MatButtonModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './product-formula.html',
  styleUrl: './product-formula.scss'
})
export class ProductFormula implements OnInit{
  data = inject(MAT_DIALOG_DATA) as {
    update: boolean,
    product: Product
  };

  dialogRef = inject(MatDialogRef<ProductFormula>);
  productService = inject(ProductService)

  createdAtControl = new FormControl<Date | null>(null);
  type = new FormControl('')
  price = signal<number | null>(null)

  productId = ""
  productsList: string[] = [];
  productsOptions!: Observable<string[]>

  showError = false
  errorMessage = "All fields need to be filled in!"

  ngOnInit(): void {
    if(this.data.update) {
      this.createdAtControl.setValue(new Date(this.data.product.startDate));
      this.type.setValue(this.data.product.type);
      this.price.set(this.data.product.price);
      this.productId = this.data.product.productId!
    }
    this.productService.getUniqueProductsFromBackend()
        .pipe(catchError((err) => {
          console.log(err);
          throw err;
        }))
        .subscribe((productsFromBackend) => {
          this.productsList = productsFromBackend.map(product => product.type)
          this.productsOptions = this.type.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value || '')),
          );
        })
  }

  filter(value: string): string[]  {
    const filterValue = value.toLowerCase();

    return this.productsList.filter(option => option.toLowerCase().includes(filterValue));
  }

  onAdd() {
    const createdAt = this.createdAtControl.value
    const type = this.type.value
    const price = this.price()

    if(createdAt == null || type == null || price == null) {
      this.showError = true;
    }else {
      const productToCreate = {
        productId: this.productId,
        startDate: createdAt.toDateString(),
        type: type,
        price: price
      }
      this.productService.addNewProductPrice(productToCreate)
        .pipe(catchError( err => {
          this.showError = true
          this.errorMessage = err.message
          throw err
        }))
        .subscribe((newProduct) => {
          this.dialogRef.close(newProduct)
        })
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
