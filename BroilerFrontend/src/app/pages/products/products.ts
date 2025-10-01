import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/products.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormula } from '../../components/product-formula/product-formula';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatIconModule, MatSortModule, MatButtonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit{
  displayedColumns: string[] = ['startDate', 'type', 'price', 'edit']
  productService = inject(ProductService)
  products = Array<Product>()

  readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    this.initializeProducts()
  }

  initializeProducts() {
    this.productService.getAllProductsFromBackend()
    .pipe(catchError((err) => {
      console.log(err);
      throw err;
    }))
    .subscribe((productsFromBackend) => {
      console.log(productsFromBackend)
      this.products = productsFromBackend
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ProductFormula, {
      autoFocus: false,
      data: {
        update: false,
        product: null
      }
    })
 
    dialogRef.afterClosed()
    .subscribe( result => {
      if (result != undefined) {
        this.products.push({
          startDate: result.startDate, 
          type: result.type, 
          price: result.price});
      }
    })
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductFormula, {
      autoFocus: false,
      data: {
        update: true,
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