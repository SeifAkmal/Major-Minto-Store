import { Product } from './../interfaces/product';
import { PRODUCTS } from './../../../data/products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // ===== ALL PRODUCTS LISTS ===== \\
  shuffledProducts = [...PRODUCTS].sort(() => Math.random() - 0.5);

  originalProducts: Product[] = [...this.shuffledProducts];
  productsList: Product[] = [...this.shuffledProducts];

  // ===== ALL ABOUT SEARCH ===== \\
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
  // ===== ALL ABOUT SORTING ===== \\
  getSortResults(item: string) {
    if (item === 'Sort by: Featured') {
      this.productsList = [...this.originalProducts];
      return;
    } else if (item === 'Price: Low to High') {
      this.productsList = [...this.productsList].sort(
        (a, b) => a.price - b.price
      );
    } else if (item === 'Price: High to Low') {
      this.productsList = [...this.productsList].sort(
        (a, b) => b.price - a.price
      );
    } else if (item === 'Rating') {
      this.productsList = [...this.productsList].sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
    }
  }
}
