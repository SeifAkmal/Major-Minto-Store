import { AuthService } from './../../../auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ProductsService } from '../../../core/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  authService = inject(AuthService);
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  modalService = inject(ModalService);
  snackBar = inject(MatSnackBar);

  searchWord = '';

  searchProducts(): void {
    this.productsService.searchProducts(this.searchWord);
  }

  openLogin(): void {
    this.modalService.open('login');
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('You have been logged out', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }
}
