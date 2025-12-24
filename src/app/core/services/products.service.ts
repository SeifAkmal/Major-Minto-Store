import { Product } from './../interfaces/product';
import { PRODUCTS } from './../../../data/products';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {
    this.loadProducts();
  }
  apiUrl = environment.apiBaseUrl + '/products';
  originalProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  productsList = this.filteredProducts.asReadonly();

  loadProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (products) => {
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        this.originalProducts.set(shuffled);
        this.filteredProducts.set([...shuffled]);
      },
      error: () => {
        const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
        this.originalProducts.set(shuffled);
        this.filteredProducts.set([...shuffled]);
      },
    });
  }

  currentSort: string = 'Sort by: Featured';
  currentCategory: string = 'All Products';
  currentRating: number = 0;

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

  applyFiltersResults() {
    let filtered = [...this.originalProducts()];

    if (this.currentCategory !== 'All Products') {
      filtered = filtered.filter((p) => p.category === this.currentCategory);
    }
    if (this.currentRating) {
      filtered = filtered.filter((p) => (p.rating ?? 0) >= this.currentRating);
    }

    if (this.currentSort === 'Price: Low to High') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'Price: High to Low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'Rating') {
      filtered = [...filtered].sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
    }

    this.filteredProducts.set(filtered);
  }

  getSearchResults(keyWord: string) {
    const key = keyWord.trim().toLowerCase();
    if (!key) {
      this.filteredProducts.set([...this.originalProducts()]);
      return;
    }
    let filtered = [...this.originalProducts()];
    filtered = filtered.filter((p) => {
      const titleWords = p.title.toLowerCase().split(' ');
      return titleWords.some((w) => w.startsWith(key));
    });

    this.filteredProducts.set(filtered);
  }

  reOrderProducts(maxShow?: number) {
    let shuffled = [...this.originalProducts()].sort(() => Math.random() - 0.5);

    shuffled = maxShow
      ? shuffled.slice(0, maxShow)
      : [...this.originalProducts()];

    this.filteredProducts.set(shuffled);
  }
}
