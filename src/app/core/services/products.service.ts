import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { PRODUCTS } from '../../../data/products';
import { environment } from '../../../environments/environment';
import {
  Observable,
  catchError,
  defer,
  delay,
  finalize,
  map,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/products`;

  readonly originalProducts = signal<Product[]>([]);
  readonly filteredProducts = signal<Product[]>([]);
  readonly productsList = this.filteredProducts.asReadonly();
  readonly loading = signal<boolean>(false);
  readonly progress = signal<number>(0);

  currentSort = 'Sort by: Featured';
  currentCategory = 'All Products';
  currentRating = 0;

  constructor() {
    this.loadProducts().subscribe();
  }

  loadProducts(): Observable<Product[]> {
    return defer(() => {
      this.loading.set(true);
      this.progress.set(0);

      return this.http.get<Product[]>(this.apiUrl).pipe(
        map((products) => this.shuffleProducts(products)),
        catchError(() => of(this.shuffleProducts(PRODUCTS))),
        delay(300),
        tap((products) => {
          this.originalProducts.set(products);
          this.filteredProducts.set([...products]);
          this.progress.set(100);
        }),
        delay(600),
        finalize(() => this.loading.set(false))
      );
    });
  }

  updateFilters(options: {
    sort?: string;
    category?: string;
    rating?: number;
  }): void {
    if (options.sort !== undefined) {
      this.currentSort = options.sort;
    }
    if (options.category !== undefined) {
      this.currentCategory = options.category;
    }
    if (options.rating !== undefined) {
      this.currentRating = options.rating;
    }

    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.originalProducts()];

    if (this.currentCategory !== 'All Products') {
      filtered = filtered.filter(
        (product) => product.category === this.currentCategory
      );
    }

    if (this.currentRating > 0) {
      filtered = filtered.filter(
        (product) => (product.rating ?? 0) >= this.currentRating
      );
    }

    filtered = this.sortProducts(filtered);

    this.filteredProducts.set(filtered);
  }

  searchProducts(keyword: string): void {
    const searchTerm = keyword.trim().toLowerCase();

    if (!searchTerm) {
      this.filteredProducts.set([...this.originalProducts()]);
      return;
    }

    const filtered = this.originalProducts().filter((product) => {
      const titleWords = product.title.toLowerCase().split(' ');
      return titleWords.some((word) => word.startsWith(searchTerm));
    });

    this.filteredProducts.set(filtered);
  }

  getRandomProducts(maxCount?: number): void {
    let shuffled = this.shuffleProducts(this.originalProducts());

    if (maxCount) {
      shuffled = shuffled.slice(0, maxCount);
    }

    this.filteredProducts.set(shuffled);
  }

  private sortProducts(products: Product[]): Product[] {
    const sorted = [...products];

    switch (this.currentSort) {
      case 'Price: Low to High':
        return sorted.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'Rating':
        return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return sorted;
    }
  }

  private shuffleProducts(products: Product[]): Product[] {
    return [...products].sort(() => Math.random() - 0.5);
  }
}
