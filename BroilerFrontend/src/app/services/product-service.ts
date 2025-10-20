import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../model/products.type';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getAllProductsFromBackend() {
    return this.http.get<Array<Product>>(environment.apiPath + '/products').pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  getUniqueProductsFromBackend() {
    return this.http.get<Array<Product>>(environment.apiPath + '/products/unique').pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  addNewProductPrice(product: Product) {
    return this.http.post<Product>(environment.apiPath + '/products', product).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  deleteProduct(productId: string, price: number) {
    return this.http.delete(environment.apiPath + '/products/' + productId + '/' + price).pipe(
      catchError((err) => {
        return throwError(() => err.error || 'Unknown Error');
      })
    );
  }
}
