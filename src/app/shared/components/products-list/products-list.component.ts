import { Component, OnInit, Signal } from '@angular/core';
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
export class ProductsListComponent implements OnInit {
  activePage: number | undefined = 1;
  products!: Signal<Product[]>;

  constructor(
    public productsService: ProductsService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.products = this.productsService.productsList;
  }

  reorderProducts(activePage: number, maxShow?: number) {
    this.productsService.reorderProducts(maxShow);
    this.activePage = activePage;
  }
}