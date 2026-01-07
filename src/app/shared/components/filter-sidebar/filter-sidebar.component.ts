import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { StarsPipe } from '../../pipes/stars.pipe';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [StarsPipe],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
})
export class FilterSidebarComponent {
  readonly categories: string[] = [
    'All Products',
    'Nuts',
    'Herbs',
    'Supplements',
  ];
  readonly ratings: number[] = [4, 3, 2];

  constructor(public productsService: ProductsService) {}

  sendCategoryChange(category: string) {
    this.productsService.updateFilters({ category });
  }

  sendRatingChange(rating: number) {
    this.productsService.updateFilters({ rating });
  }
}
