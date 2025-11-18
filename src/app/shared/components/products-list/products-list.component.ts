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
export class ProductsListComponent implements OnInit {
  constructor(public ProductsService: ProductsService) {}
  // ===== GET-PRODUCTS ===== \\
  productsList: Product[] = [];
  ngOnInit(): void {
    this.productsList = this.ProductsService.getProducts();
  }
  // ===== GET-STARS ===== \\
  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  // ===== PRODUCT-NAV ===== \\
  activatedpage: number | undefined = 1;
  reOrderProducts(maxShow?: number, activated?: number) {
    this.productsList = maxShow
      ? this.ProductsService.getProducts().slice(0, maxShow)
      : this.ProductsService.getProducts();

    this.activatedpage = activated;
  }
}
