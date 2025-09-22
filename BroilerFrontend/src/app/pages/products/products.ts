import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/products.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

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
}
