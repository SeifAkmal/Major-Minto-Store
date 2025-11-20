import { Product } from './../interfaces/product';
import { PRODUCTS } from './../../../data/products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  shuffledProducts = [...PRODUCTS].sort(() => Math.random() - 0.5);
  originalProducts: Product[] = [...this.shuffledProducts];
  productsList: Product[] = [...this.shuffledProducts];

  getSearchResults(keyWord: string) {
    const key = keyWord.trim().toLowerCase();

    if (!key) {
      this.productsList = [...this.originalProducts];
      return;
    }

    this.productsList = this.originalProducts.filter((u) => {
      const titleWords = u.title.toLowerCase().split(' ');
      return titleWords.some((w) => w.startsWith(key));
    });
  }
}
