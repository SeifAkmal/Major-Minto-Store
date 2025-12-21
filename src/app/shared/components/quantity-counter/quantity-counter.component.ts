import {
  Component,
  computed,
  Input,
  OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-quantity-counter',
  standalone: true,
  imports: [],
  templateUrl: './quantity-counter.component.html',
  styleUrl: './quantity-counter.component.scss',
})
export class QuantityCounterComponent implements OnChanges {
  constructor(private _cartService: CartService) {}

  @Input() product!: Product;

  quantity!: Signal<number>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'].currentValue) {
      const product: Product = changes['product'].currentValue;
      this.quantity = this._cartService.getQuantity(product.id);
    }
  }

  minusProduct(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const current = this.quantity();
    if (current > 0) {
      this._cartService.updateCart(this.product, current - 1);
    }
  }

  plusProduct(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const current = this.quantity();
    if (current < 10) {
      this._cartService.updateCart(this.product, current + 1);
    }
  }
}
