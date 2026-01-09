import { Component, inject, output } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  readonly checkoutService = inject(CheckoutService);
  readonly cartService = inject(CartService);
  close = output<void>();
}
