import { ProductsService } from './../../../core/services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.scss',
})
export class FiltersSidebarComponent {
  constructor(public productsService: ProductsService) {}
  category: string[] = ['All Products', 'Nuts', 'Herbs', 'Supplements'];
  rating: number[] = [4, 3, 2];

  sendCategoryValue(cat: string) {
    this.productsService.getCategoryResults(cat);
  }
  sendRatingValue(rate: number) {
    this.productsService.getRatingResults(rate);
  }
}
