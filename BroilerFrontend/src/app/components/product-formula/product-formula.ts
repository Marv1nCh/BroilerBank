import { Component, inject, signal } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-formula',
  imports: [MatDialogContent, MatFormField, MatLabel, 
    MatDialogActions, FormsModule, MatInputModule, 
    MatDatepickerModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './product-formula.html',
  styleUrl: './product-formula.scss'
})
export class ProductFormula {
  dialogRef = inject(MatDialogRef<ProductFormula>);
  productService = inject(ProductService)

  createdAtControl = new FormControl(null);
  type = signal(null)
  price = signal(null)

  showError = false
  errorMessage = "All fields need to be filled in!"

  onAdd() {
    const createdAt = this.createdAtControl.value
    const type = this.type()
    const price = this.price()

    if(createdAt == null || type == null || price == null) {
      this.showError = true;
    }else {
      this.productService.addNewProductPrice({startDate: this.createdAtControl.value!, type: this.type()!, price: this.price()!})
        .subscribe((newProduct) => {
          this.dialogRef.close(newProduct)
        })
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
