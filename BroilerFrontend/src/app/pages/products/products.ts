import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/products.type';
import { catchError } from 'rxjs';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormula } from '../../components/product-formula/product-formula';

@Component({
  selector: 'app-products',
  imports: [MatTableModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit{
  displayedColumns: string[] = ['start_date', 'type', 'price']
  productService = inject(ProductService)
  products = Array<Product>()

  readonly dialog = inject(MatDialog)
  @ViewChild('productTable', {static: true, read: MatTable}) table: any

  ngOnInit(): void {
    this.productService.getAllProductsFromBackend()
    .pipe(catchError((err) => {
      console.log(err);
      throw err;
    }))
    .subscribe((productsFromBackend) => {
      this.products = productsFromBackend
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormula, {})

    dialogRef.afterClosed()
    .subscribe( result => {
      if (result != undefined) {
        this.products.push({start_date: result.start_date, type: result.type, price: result.price});
        this.table.renderRows()
      }
    })
  }
}
