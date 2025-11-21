import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/interfaces/product';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass, NgStyle],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  constructor(public ProductsService: ProductsService) {}
  // ===== GET STARS ===== \\
  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  // ===== PRODUCTS NAV ===== \\
  productsList: Product[] = [];
  activatedpage: number | undefined = 1;
  reOrderProducts(maxShow?: number, activated?: number) {
    this.ProductsService.productsList = maxShow
      ? this.ProductsService.productsList.slice(0, maxShow)
      : this.ProductsService.originalProducts;

    this.activatedpage = activated;
  }
}
