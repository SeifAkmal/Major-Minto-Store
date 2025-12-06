import { Component, Input } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent {
  constructor(private _cartService: CartService) {}

  @Input() product!: Product;

  // QUANTITY COMING FROM PARENT
  @Input() quantity!: number;

  // USED TO STYLE THE BUTTON
  @Input() buttonSize!: string;

  sendProductToCart(event: Event, item: Product) {
    event.preventDefault();
    event.stopPropagation();

    // TRIGGER CART LOGIC
    this._cartService.addProductToCart(item, this.quantity);
  }
}

