import { Product } from './../../../core/interfaces/product';
import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { StarsPipe } from '../../pipes/stars.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass, NgStyle, StarsPipe, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  constructor(public ProductsService: ProductsService) {}
  // UPDATE PRODUCTS LIST BASED ON NAVIGATION SETTINGS
  activatedPage: number | undefined = 1;
  reOrderProducts(activated: number, maxShow?: number) {
    let splicedProducts: Product[] = [
      ...this.ProductsService.originalProducts,
    ].sort(() => Math.random() - 0.5);

    splicedProducts = maxShow
      ? splicedProducts.slice(0, maxShow)
      : this.ProductsService.originalProducts;

    this.ProductsService.productsList = splicedProducts;
    this.activatedPage = activated;
  }
  // UPDATE PL-NAV STYLE BASED ON SELECTED PAGE
  activeStyles = {
    backgroundColor: '#137A3F',
    boxShadow: '0px 0px 15px rgba(19, 122, 63, 0.5)',
  };
  inactiveStyles = {
    backgroundColor: '#0B1F15',
  };
}
