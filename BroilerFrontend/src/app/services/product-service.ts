import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../model/products.type';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)

  getAllProductsFromBackend() {
    return this.http.get<Array<Product>>(AppConstants.BASE_URL + "/products")
  }
}
