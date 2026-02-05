import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { QuantityCounterComponent } from '../quantity-counter/quantity-counter.component';
import { CartService } from '../../../core/services/cart.service';
import { ProductsService } from '../../../core/services/products.service';
import { StarsPipe } from '../../pipes/stars.pipe';
import { SkeletonCardComponent } from "../skeleton-card/skeleton-card.component";

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
    NgxSkeletonLoaderModule,
    SkeletonCardComponent
],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  activePage: number | undefined = 1;
  currentPage = signal<number>(1);
  pageSize = 9;
  imageLoaded: Record<number, boolean> = {};

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
    public cartService: CartService,
  ) {}

  getRandomProducts(activePage: number, maxShow?: number) {
    this.productsService.getRandomProducts(maxShow);
    this.activePage = activePage;
  }
}
