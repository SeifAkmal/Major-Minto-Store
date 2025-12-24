import { Component, OnInit } from '@angular/core';
import { QuantityCounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { StarsPipe } from '../../shared/pipes/stars.pipe';
import { ProductsService } from '../../core/services/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}
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
  recommendedProducts: Product[] = [];
  ngOnInit(): void {
    //  this.productsService.productsList.subscribe(
    //   (products) => {
    //     this.recommendedProducts = products.slice(0, 4);
    //   }
    // );
    // this.recommendedProducts = similarProducts;
  }
}
