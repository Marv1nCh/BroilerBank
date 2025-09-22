import { Component, inject, signal } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/autocomplete';
import { ProductType } from '../../model/product-type.type';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-formula',
  imports: [MatDialogContent, MatFormField, MatLabel, 
    MatDialogActions, FormsModule, MatInputModule, 
    MatDatepickerModule, MatOption, ReactiveFormsModule, MatSelectModule],
  templateUrl: './product-formula.html',
  styleUrl: './product-formula.scss'
})
export class ProductFormula {
  dialogRef = inject(MatDialogRef<ProductFormula>);
  productService = inject(ProductService)

  createdAtControl = new FormControl(new Date());
  typeControl = new FormControl(ProductType.broiler)
  price = signal(0)

  foodOptions: Array<ProductType> = [
    ProductType.broiler,
    ProductType.fries,
    ProductType.coleslaw
  ]

  onAdd() {
    if (this.createdAtControl != null && this.typeControl != null){
      this.productService.addNewProductPrice({start_date: this.createdAtControl.value ?? new Date(), type: this.typeControl.value ?? ProductType.broiler, price: this.price()})
        .subscribe((newProduct) => {
          this.dialogRef.close(newProduct)
        })
    }else {
      //TODO: Add warning to input all values
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
