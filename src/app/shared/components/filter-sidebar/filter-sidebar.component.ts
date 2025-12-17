import { ProductsService } from '../../../core/services/products.service';
import { Component } from '@angular/core';
import { StarsPipe } from '../../pipes/stars.pipe';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [StarsPipe],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
})
export class FilteridebarComponent {
  constructor(public productsService: ProductsService) {}
  
  readonly category: string[] = [
    'All Products',
    'Nuts',
    'Herbs',
    'Supplements',
  ];
  readonly rating: number[] = [4, 3, 2];
  
  sendCategoryChange(cat: string) {
    this.productsService.updateFiltersResults({ category: cat });
  }
  sendRatingChange(rate: number) {
    this.productsService.updateFiltersResults({ rating: rate });
  }
}
