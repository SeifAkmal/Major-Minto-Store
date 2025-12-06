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

  // USED TO HIGHLIGHT ACTIVE NAV PAGE
  activatedPage: number | undefined = 1;

  reOrderProducts(activated: number, maxShow?: number) {
    // USED TO RANDOMIZE PRODUCTS EACH TIME
    let splicedProducts: Product[] = [
      ...this.ProductsService.originalProducts,
    ].sort(() => Math.random() - 0.5);

    // OPTIONAL LIMIT FOR HOME/GALLERY SECTIONS
    splicedProducts = maxShow
      ? splicedProducts.slice(0, maxShow)
      : this.ProductsService.originalProducts;

    // UPDATE LIST SHOWN ON SCREEN
    this.ProductsService.productsList = splicedProducts;

    // SYNC UI WITH CURRENT PAGE
    this.activatedPage = activated;
  }

  // DEFAULT QUANTITY USED WHEN ADDING FROM LIST VIEW
  selectedQuantity: number = 1;
}
