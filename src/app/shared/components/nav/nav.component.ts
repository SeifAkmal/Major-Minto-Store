import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  searchWord = '';

  constructor(
    public productsService: ProductsService,
    public cartService: CartService
  ) {}

  searchProducts() {
    this.productsService.getSearchResults(this.searchWord);
  }
}