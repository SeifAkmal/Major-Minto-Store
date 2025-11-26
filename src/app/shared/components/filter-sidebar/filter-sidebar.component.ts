import { ProductsService } from '../../../core/services/products.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
})
export class FilteridebarComponent {
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
