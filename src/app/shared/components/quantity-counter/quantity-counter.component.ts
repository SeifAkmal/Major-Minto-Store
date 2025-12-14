import { Component, Input, OnInit, Signal } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quantity-counter',
  standalone: true,
  imports: [],
  templateUrl: './quantity-counter.component.html',
  styleUrl: './quantity-counter.component.scss',
})
export class QuantityCounterComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute
  ) {}

  @Input() product!: Product;

  quantitySignal!: Signal<number>;

  ngOnInit(): void {
    this.quantitySignal = this._cartService.getQuantity(this.product.id);
  }

  minusProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const current = this.quantitySignal();

    if (current > 0) {
      this._cartService.updateCart(this.product, current - 1);
    }
  }
  plusProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const current = this.quantitySignal();

    if (current < 10) {
      this._cartService.updateCart(this.product, current + 1);
    }
  }
}
