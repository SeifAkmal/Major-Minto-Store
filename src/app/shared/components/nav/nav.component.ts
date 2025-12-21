import { CartService } from './../../../core/services/cart.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(
    public ProductsService: ProductsService,
    public cartService: CartService
  ) {}

  searchWord: string = '';
  searchProducts() {
    this.ProductsService.getSearchResults(this.searchWord);
  }
}
