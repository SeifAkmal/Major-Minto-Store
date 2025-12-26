import { Component, computed, input, Input } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/interfaces/product';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent {
  constructor(public cartService: CartService, private snackBar: MatSnackBar) {}

  @Input() buttonSize!: string;
  product = input.required<Product>();
  selectedQuantity!: number;

  productId = computed(() => {
    this.selectedQuantity = 1;
    return this.product()?.id;
  });

  isInCartSignal = computed(() => {
    const id = this.productId();
    return id ? this.cartService.isInCart(id)() : false;
  });

  sendProduct(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.updateCart(this.product(), this.selectedQuantity);
    this.snackBar.open(this.product().title + ' added to cart', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }
}
