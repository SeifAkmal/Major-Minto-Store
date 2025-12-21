import { Component, OnInit } from '@angular/core';
import { QuantityCounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { StarsPipe } from '../../shared/pipes/stars.pipe';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    QuantityCounterComponent,
    CurrencyPipe,
    StarsPipe,
    RouterLink,
    NgClass,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public productsService: ProductsService
  ) {}
  deleteProduct(item: Product, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.updateCart(item, 0);
  }
  recommendedProducts: Product[] = [];
  ngOnInit(): void {
    const similarProducts = this.productsService.productsList.slice(0, 4);
    this.recommendedProducts = similarProducts;
  }
}
