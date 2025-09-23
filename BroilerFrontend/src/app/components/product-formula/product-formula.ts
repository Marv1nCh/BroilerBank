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

  createdAtControl = new FormControl(null);
  typeControl = new FormControl(null)
  price = signal(0)

  foodOptions: Array<ProductType> = [
    ProductType.broiler,
    ProductType.fries,
    ProductType.coleslaw
  ]

  showError = false
  errorMessage = "All fields need to be filled in!"

  onAdd() {
    if (this.createdAtControl.value != null && this.typeControl.value != null){
      this.productService.addNewProductPrice({startDate: this.createdAtControl.value!, type: this.typeControl.value!, price: this.price()})
        .subscribe((newProduct) => {
          this.dialogRef.close(newProduct)
        })
    }else {
      this.showError = true;
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
