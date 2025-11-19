import { Product } from './../interfaces/product';
import { PRODUCTS } from './../../../data/products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  originalProducts: Product[] = [...PRODUCTS.sort(() => Math.random() - 0.5)];
  productsList: Product[] = [...PRODUCTS.sort(() => Math.random() - 0.5)];

  getSearchResults(keyWord: string) {
    this.productsList = this.originalProducts.filter((u) => {
      const titleWords = u.title.toLowerCase().split(' ');
      const key = keyWord.toLowerCase();

      return titleWords.some((w) => w.startsWith(key));
    });
  }
}
