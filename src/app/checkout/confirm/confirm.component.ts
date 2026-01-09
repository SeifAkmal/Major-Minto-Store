import { Component, inject, output, signal } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  readonly checkoutService = inject(CheckoutService);
  readonly cartService = inject(CartService);
  readonly modalService = inject(ModalService);
  readonly close = output<void>();
  readonly loading = signal(false);
  readonly success = signal(false);

  confirmOrder(): void {
    this.loading.set(true);

    setTimeout(() => {
      this.cartService.clearCart();
      this.success.set(true);
      this.loading.set(false);
    }, 1200);
  }
}
