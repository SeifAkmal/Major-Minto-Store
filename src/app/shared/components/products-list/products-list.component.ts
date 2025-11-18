import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/interfaces/product';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
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
}
