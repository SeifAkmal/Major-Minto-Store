import { Component, inject } from '@angular/core';
import { ShippingComponent } from '../shipping/shipping.component';
import { ReviewComponent } from '../review/review.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { CheckoutService } from '../checkout.service';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ShippingComponent, ReviewComponent, ConfirmComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  readonly modalService = inject(ModalService);
  readonly checkoutService = inject(CheckoutService);
}
