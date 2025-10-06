import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/products.type';
import { catchError, map, Observable, startWith } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WarningDialog } from '../../components/warning-dialog/warning-dialog';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatIconModule, MatSortModule, MatButtonModule,
    MatDialogModule, MatFormField, MatLabel, MatInputModule, MatDatepicker,
    ReactiveFormsModule, FormsModule, MatDialogContent,
    MatDatepickerModule, MatSelectModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit{
  constructor(private snackBar: MatSnackBar) {}

  productService = inject(ProductService)
  products = Array<Product>()

  readonly dialog = inject(MatDialog)

  createdAtControl = new FormControl<Date | null>(null);
  type = new FormControl<string | null>(null)
  price = signal<number | null>(null)

  dateError = false
  dateErrorMessage = "Date has to be filled in!"
  typeError = false
  typeErrorMessage = "Type has to be filled in!"
  priceError = false
  priceErrorMessage = "Price has to be filled in!"

  productsList: string[] = [];
  productsOptions!: Observable<string[]>

  createdAtControlEdit = new FormControl<Date | null>(null);
  typeEdit = new FormControl<string | null>(null)
  priceEdit = new FormControl<number | null>(null)

  dateErrorEdit = false
  dateErrorMessageEdit = "Date has to be filled in!"
  typeErrorEdit = false
  typeErrorMessageEdit = "Type has to be filled in!"
  priceErrorEdit = false
  priceErrorMessageEdit = "Price has to be filled in!"

  currentlyEditingId: string | null = null
  currentlyEditingDate: string | null = null
  rowBeingEdited: Product | null = null

  ngOnInit(): void {
    this.initializeProducts()
    
    this.productService.getUniqueProductsFromBackend()
        .pipe(catchError((err) => {
          console.log(err);
          throw err;
        }))
        .subscribe((productsFromBackend) => {
          this.productsList = productsFromBackend.map(product => product.type)
          this.sortData({active: 'startDate', direction: 'asc'})
          this.productsOptions = this.type.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value || '')),
          );
        })
  }

  initializeProducts() {
    this.productService.getAllProductsFromBackend()
    .pipe(catchError((err) => {
      console.log(err);
      throw err;
    }))
    .subscribe((productsFromBackend) => {
      this.products = productsFromBackend
      this.sortData({active: 'startDate', direction: 'asc'})
    })
  }

  onSaveEdit(product: Product) {
    const createdAt = this.createdAtControlEdit.value
    const type = this.typeEdit.value
    const price = this.priceEdit.value

    if(createdAt == null){
      this.dateErrorEdit = true
    }
    else if(type == null || type == ''){
      this.typeErrorEdit = true
    }
    else if(price == null || price == undefined){
      this.priceErrorEdit = true
    }
    else {
      const productToUpdate = {
        productId: product.productId,
        startDate: product.startDate,
        type: type,
        price: price
      }
      this.addProduct(productToUpdate)
      this.resetEditingValues()
    }
  }

  onSavedNewProduct() {
    const createdAt = this.createdAtControl.value
    const type = this.type.value
    const price = this.price()

    if(createdAt == null){
      this.dateError = true
    }
    else if(type == null || type == ''){
      this.typeError = true
    }
    else if(price == null){
      this.priceError = true
    }
    else {
      const productToCreate = {
        startDate: createdAt.toDateString(),
        type: type,
        price: price
      }
      this.addProduct(productToCreate)
      this.resetEditingValues()
    }
  }

  addProduct(product: Product){
    const dialogRef = this.dialog.open(WarningDialog, {
      autoFocus: false,
      data: {
        warning: "Are you sure you chose the correct name?",
        message: "Changing this to an already existing type is not possible after this. Also changing the Date is not possible after this."
      }
    });
    dialogRef.afterClosed()
      .subscribe( result => {
        if (result) {
          this.productService.addNewProductPrice(product)
            .pipe(catchError( err => {
              console.log(err)
              throw err
            }))
            .subscribe(() => {
              this.initializeProducts()
              this.createdAtControl.setValue(null)
              this.type.setValue(null)
              this.price.set(null)
              this.openSnackBar("Product has been saved!")
            })
        }
      })
  }
  
  filter(value: string): string[]  {
    const filterValue = value.toLowerCase();

    return this.productsList.filter(option => option.toLowerCase().includes(filterValue));
  }

  disableErrors() {
    this.dateError = false
    this.typeError = false
    this.priceError = false
  }

  disableEditErrors() {}

  onEdit(newCurrentlyEditedProduct: Product){
    this.dateErrorEdit = false
    this.typeErrorEdit = false
    this.priceErrorEdit = false

    if (this.rowBeingEdited != null) {
      const purchaseIndex = this.products.findIndex(product => product.productId == this.currentlyEditingId && product.startDate == this.currentlyEditingDate)
      this.products[purchaseIndex] = this.rowBeingEdited 
    }

    const newProductBeingEdited = this.products.find(product => 
      product.productId == newCurrentlyEditedProduct.productId &&
       product.startDate == newCurrentlyEditedProduct.startDate)

    if(newProductBeingEdited != null) {
      this.rowBeingEdited = newProductBeingEdited
      this.currentlyEditingId = newProductBeingEdited.productId!
      this.currentlyEditingDate = newProductBeingEdited.startDate

      this.createdAtControlEdit.setValue(new Date(newProductBeingEdited.startDate))
      this.typeEdit.setValue(newProductBeingEdited.type)
      this.priceEdit.setValue(Number(newProductBeingEdited.price))
    }
  }

  onCancelEdit() {
    if(this.rowBeingEdited != null) {
      const productIndex = this.products.findIndex(product => product.productId == this.currentlyEditingId && product.startDate == this.currentlyEditingDate)
      this.products[productIndex] = this.rowBeingEdited

      this.resetEditingValues()
    }
  }

  resetEditingValues() {
    this.createdAtControlEdit.setValue(null)
    this.typeEdit.setValue(null)
    this.priceEdit.setValue(null)

    this.currentlyEditingDate = null
    this.currentlyEditingId = null
    this.rowBeingEdited = null
  }

  formatDateToString(date: Date) {
    return new Date(date).toDateString();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction == ''){
      return
    }

    this.products = this.products.sort((a, b) => {
      const isAsc = sort.direction == 'asc'
      switch (sort.active) {
        case 'startDate':
          return compare(a.startDate, b.startDate, isAsc);
        case 'type':
          return compare(a.type, b.type, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }

  openSnackBar (message: string) {
    this.snackBar.open(message, "close")
  }
}