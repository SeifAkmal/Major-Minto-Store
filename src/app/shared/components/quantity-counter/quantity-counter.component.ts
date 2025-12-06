import { Component, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-quantity-counter',
  standalone: true,
  imports: [],
  templateUrl: './quantity-counter.component.html',
  styleUrl: './quantity-counter.component.scss',
})
export class QuantityCounterComponent {
  constructor(private cartService: CartService) {}

  selectedQuantity: number = 1;

  @Input() product!: Product;

  // DECREASE PRODUCT QUANTITY AND UPDATE CART
  minusProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();

    // PREVENT NEGATIVE QUANTITY
    if (this.selectedQuantity > 0) {
      this.selectedQuantity--;
    }

    // UPDATE CART AFTER CHANGING QUANTITY
    this.cartService.addProductToCart(this.product, this.selectedQuantity);
  }

  // INCREASE PRODUCT QUANTITY AND UPDATE CART
  plusProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();

    // LIMIT MAX QUANTITY
    if (this.selectedQuantity < 10) {
      this.selectedQuantity++;
    }

    // UPDATE CART AFTER CHANGING QUANTITY
    this.cartService.addProductToCart(this.product, this.selectedQuantity);
  }
}
