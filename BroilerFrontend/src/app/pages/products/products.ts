import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/products.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormula } from '../../components/product-formula/product-formula';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { compare } from '../../shared/utils';

@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatIconModule, MatSortModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit{
  displayedColumns: string[] = ['startDate', 'type', 'price']
  productService = inject(ProductService)
  products = Array<Product>()

  readonly dialog = inject(MatDialog)

  ngOnInit(): void {
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

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormula, {})
 
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