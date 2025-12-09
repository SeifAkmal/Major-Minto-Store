import { CartService } from './../../../core/services/cart.service';
import { Product } from './../../../core/interfaces/product';
import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { StarsPipe } from '../../pipes/stars.pipe';
import { RouterLink } from '@angular/router';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { QuantityCounterComponent } from '../quantity-counter/quantity-counter.component';

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
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  constructor(
    public ProductsService: ProductsService,
    public cartService: CartService
  ) {}

  // USED TO HIGHLIGHT ACTIVE NAVIGATION PAGE
  activatedPage: number | undefined = 1;

  reOrderProducts(activated: number, maxShow?: number) {
    // RANDOMIZE ORIGINAL PRODUCTS FOR DISPLAY
    let splicedProducts: Product[] = [
      ...this.ProductsService.originalProducts,
    ].sort(() => Math.random() - 0.5);

    // LIMIT NUMBER OF DISPLAYED PRODUCTS IF NEEDED
    splicedProducts = maxShow
      ? splicedProducts.slice(0, maxShow)
      : this.ProductsService.originalProducts;

    // UPDATE VISIBLE PRODUCTS LIST
    this.ProductsService.productsList = splicedProducts;

    // UPDATE ACTIVE PAGE STATE
    this.activatedPage = activated;
  }
}
