import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})
export class ShippingComponent {
  private readonly fb = inject(FormBuilder);
  readonly checkoutService = inject(CheckoutService);
  readonly close = output<void>();

  readonly shippingInfoForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
  });

  submitShippingInfo(): void {
    if (this.shippingInfoForm.invalid) return;

    const shippingForm = this.shippingInfoForm.getRawValue();
    this.checkoutService.saveShippingInfo(shippingForm);
    this.checkoutService.goToStep(2);
  }
}
