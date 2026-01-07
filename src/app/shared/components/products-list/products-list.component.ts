import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { QuantityCounterComponent } from '../quantity-counter/quantity-counter.component';
import { LoaderComponent } from '../loader/loader.component';
import { CartService } from '../../../core/services/cart.service';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/interfaces/product';
import { StarsPipe } from '../../pipes/stars.pipe';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    StarsPipe,
    RouterLink,
    AddToCartComponent,
    QuantityCounterComponent,
    LoaderComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  activePage: number | undefined = 1;
  currentPage = signal<number>(1);
  pageSize = 9;

  products = computed(() => {
    return this.productsService.productsList() ?? [];
  });

  visibleProducts = computed(() => {
    const end = this.currentPage() * this.pageSize;
    return this.products().slice(0, end);
  });

  loadMore() {
    this.currentPage.update((page) => {
      return page + 1;
    });
  }

  constructor(
    public productsService: ProductsService,
    public cartService: CartService
  ) {}

  getRandomProducts(activePage: number, maxShow?: number) {
    this.productsService.getRandomProducts(maxShow);
    this.activePage = activePage;
  }
}
