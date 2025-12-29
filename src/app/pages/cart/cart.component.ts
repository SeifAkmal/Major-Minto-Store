import { Component, computed } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QuantityCounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { StarsPipe } from '../../shared/pipes/stars.pipe';
import { RegisterComponent } from '../../auth/register/register.component';

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
    RegisterComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    public cartService: CartService,
    public productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}
  showRegister = false;
  deleteProduct(item: Product, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.updateCart(item, 0);
    this.snackBar.open(item.title + ' removed from cart', '', {
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
}
