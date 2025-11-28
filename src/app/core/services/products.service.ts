import { Product } from './../interfaces/product';
import { PRODUCTS } from './../../../data/products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // ALL PRODUCTS LISTS
  originalProducts: Product[] = [...PRODUCTS].sort(() => Math.random() - 0.5);
  productsList: Product[] = [...this.originalProducts];

  // ALL ABOUT SEARCH
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
  //  ALL ABOUT FILTERS & SORTING
  currentSort: string = 'Sort by: Featured';
  currentCategory: string = 'All Products';
  currentRating: number = 0;

  applyFiltersResults() {
    let userFilters: Product[] = [...this.originalProducts];

    // APPLY FILTERS
    if (this.currentCategory != 'All Products') {
      userFilters = userFilters.filter(
        (p) => p.category == this.currentCategory
      );
    }

    // APPLY RATING
    if (this.currentRating) {
      userFilters = userFilters.filter(
        (p) => (p.rating ?? 0) >= this.currentRating
      );
    }

    // APPLY SORTING
    if (this.currentSort === 'Price: Low to High') {
      userFilters.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'Price: High to Low') {
      userFilters.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'Rating') {
      userFilters.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    this.productsList = userFilters;
  }

  updateFiltersResults(options: {
    sort?: string;
    category?: string;
    rating?: number;
  }) {
    if (options.sort !== undefined) {
      this.currentSort = options.sort;
    }
    if (options.category !== undefined) {
      this.currentCategory = options.category;
    }
    if (options.rating !== undefined) {
      this.currentRating = options.rating;
    }
    this.applyFiltersResults();
  }
}
