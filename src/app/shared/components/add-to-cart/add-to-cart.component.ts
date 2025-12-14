import { Component, Input, OnInit, Signal } from '@angular/core';
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

  @Input() buttonSize!: string;

  quantitySignal!: Signal<number>;

  selectedQuantity!: number;

  ngOnInit(): void {
    this.quantitySignal = this._cartService.getQuantity(this.product.id);
    if (this.quantitySignal() === 0) {
      this.selectedQuantity = 1;
    } else {
      this.selectedQuantity = this.quantitySignal();
    }
  }

  sendProduct(event: Event, item: Product) {
    event.preventDefault();
    event.stopPropagation();

    this._cartService.updateCart(item, this.selectedQuantity);
  }
}
