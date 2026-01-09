import { Injectable, signal } from '@angular/core';
import { ShippingInfo } from '../core/interfaces/shippingInfo';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly currentStep = signal<1 | 2 | 3>(1);
  readonly shippingInfo = signal<ShippingInfo | null>(null);

  saveShippingInfo(info: ShippingInfo): void {
    this.shippingInfo.set(info);
  }

  goToStep(step: 1 | 2 | 3): void {
    this.currentStep.set(step);
  }

  reset(): void {
    this.currentStep.set(1);
    this.shippingInfo.set(null);
  }
}
