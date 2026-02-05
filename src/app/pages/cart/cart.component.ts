import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QuantityCounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { StarsPipe } from '../../shared/pipes/stars.pipe';
import { AuthService } from '../../auth/auth.service';
import { ModalService } from '../../core/services/modal.service';
import { CheckoutService } from '../../checkout/checkout.service';
import { SkeletonCardComponent } from "../../shared/components/skeleton-card/skeleton-card.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    QuantityCounterComponent,
    CurrencyPipe,
    StarsPipe,
    RouterLink,
    NgClass,
    MatSnackBarModule,
    LoaderComponent,
    SkeletonCardComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cartService = inject(CartService);
  readonly productsService = inject(ProductsService);
  readonly authService = inject(AuthService);
  readonly modalService = inject(ModalService);
  readonly checkoutService = inject(CheckoutService);
  private readonly snackBar = inject(MatSnackBar);

  deleteProduct(item: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.updateCart(item, 0);
    this.snackBar.open(`${item.title} removed from cart`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar-delete'],
    });
  }

  recommendedProducts = computed(() => {
    if (!this.cartService.cart().length) {
      return this.productsService.productsList().slice(0, 4);
    }

    const products = this.productsService.originalProducts();
    const cartCategories = this.cartService.cart().map((p) => p.category);
    const cartProductIds = this.cartService.cart().map((p) => p.id);

    return products
      .filter(
        (p) =>
          cartCategories.includes(p.category) && !cartProductIds.includes(p.id)
      )
      .slice(0, 4);
  });

  openCheckout(): void {
    this.modalService.open('checkout');
    this.checkoutService.reset();
  }
}
