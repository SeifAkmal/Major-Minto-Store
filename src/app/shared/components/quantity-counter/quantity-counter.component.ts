import {
  Component,
  computed,
  Input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
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
    private _route: ActivatedRoute
  ) {}

  @Input() product!: Product;

  productId = signal<number | null>(null);

  quantity!: Signal<number>;

  ngOnInit(): void {
    if (this.product) {
      this.productId.set(this.product.id);
    }

    this._route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.productId.set(id);
      }
    });

    this.quantity = computed(() => {
      const id = this.productId();
      return id ? this._cartService.getQuantity(id)() : 0;
    });
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
