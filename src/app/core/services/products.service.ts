import { Product } from '../interfaces/product';
import { PRODUCTS } from './../../../data/products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getProducts(): Product[] {
    return [...PRODUCTS.sort(() => Math.random() - 0.5)];
  }
}
