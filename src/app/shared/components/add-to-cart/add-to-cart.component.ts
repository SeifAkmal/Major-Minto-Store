import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent implements OnInit {
  constructor(public _cartService: CartService) {}

  @Input() product!: Product;

  // USED TO STYLE BUTTON SIZE FROM PARENT
  @Input() buttonSize!: string;

  // HOLDS CURRENT QUANTITY FOR THIS PRODUCT
  selectedQuantity!: any;

  ngOnInit(): void {
    // DEFAULT QUANTITY WHEN PRODUCT IS NOT IN CART
    if (this._cartService.getQuantity(this.product.id) == 0) {
      this.selectedQuantity = 1;
    }
  }

  sendProduct(event: Event, item: Product) {
    event.preventDefault();
    event.stopPropagation();

    // TRIGGER CART UPDATE
    this._cartService.addProductToCart(item, this.selectedQuantity);
  }
}
