import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../model/products.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)

  getAllProductsFromBackend() {
    return this.http.get<Array<Product>>(environment.apiPath + "/products")
  }

  getUniqueProductsFromBackend() {
    return this.http.get<Array<Product>>(environment.apiPath + "/products/unique")
  }

  addNewProductPrice(product: Product) {
    return this.http.post<Product>(environment.apiPath + "/products", product)
  }
}
