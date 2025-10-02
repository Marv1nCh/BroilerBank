import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/products.type';
import { catchError, map, Observable, startWith } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ProductFormula } from '../../components/product-formula/product-formula';
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

  ngOnInit(): void {
    this.initializeProducts()
    
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

  initializeProducts() {
    this.productService.getAllProductsFromBackend()
    .pipe(catchError((err) => {
      console.log(err);
      throw err;
    }))
    .subscribe((productsFromBackend) => {
      this.products = productsFromBackend
    })
  }
  
  filter(value: string): string[]  {
    const filterValue = value.toLowerCase();

    return this.productsList.filter(option => option.toLowerCase().includes(filterValue));
  }

  openDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductFormula, {
      autoFocus: false,
      data: {
        update: product != null,
        product: product
      }
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != undefined) {
          this.initializeProducts()
        }
      })
  }

  disableErrors() {
    this.dateError = false
    this.typeError = false
    this.priceError = false
  }

  onAdd() {
    const createdAt = this.createdAtControl.value
    const type = this.type.value
    const price = this.price()

    if(createdAt == null){
      this.dateError = true
    }
    if(type == null || type == ''){
      this.typeError = true
    }
    if(price == null){
      this.priceError = true
    }

    if(createdAt != null && type != null && type != '' && price != null) {
        const dialogRef = this.dialog.open(WarningDialog, {
          autoFocus: false,
          data: {
            warning: "Are you sure you chose the correct name?",
            message: "Changing this to an already existing type is not possible after this."
          }
        });
        dialogRef.afterClosed()
          .subscribe( result => {
            if (result) {
              const productToCreate = {
                startDate: createdAt.toDateString(),
                type: type,
                price: price
              }
              this.productService.addNewProductPrice(productToCreate)
                .pipe(catchError( err => {
                  console.log(err)
                  throw err
                }))
                .subscribe(() => {
                  this.initializeProducts()
                  this.createdAtControl.setValue(null)
                  this.type.setValue(null)
                  this.price.set(null)
                })
            }
          })
    }
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
}