import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { PRODUCTS } from '../../../data/products';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiUrl = environment.apiBaseUrl + '/products';

  originalProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  productsList = this.filteredProducts.asReadonly();
  loading = false;

  currentSort = 'Sort by: Featured';
  currentCategory = 'All Products';
  currentRating = 0;

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (products) => {
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        setTimeout(() => {
          this.originalProducts.set(shuffled);
          this.filteredProducts.set([...shuffled]);
          this.loading = false;
        }, 1000);
      },
      error: () => {
        const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
        setTimeout(() => {
          this.originalProducts.set(shuffled);
          this.filteredProducts.set([...shuffled]);
          this.loading = false;
        }, 1000);
      },
    });
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

  getSearchResults(keyword: string) {
    const key = keyword.trim().toLowerCase();
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

  reorderProducts(maxShow?: number) {
    let shuffled = [...this.originalProducts()].sort(() => Math.random() - 0.5);

    shuffled = maxShow
      ? shuffled.slice(0, maxShow)
      : [...this.originalProducts()];

    this.filteredProducts.set(shuffled);
  }
}
