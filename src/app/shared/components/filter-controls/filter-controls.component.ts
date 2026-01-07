import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-filter-controls',
  standalone: true,
  imports: [],
  templateUrl: './filter-controls.component.html',
  styleUrl: './filter-controls.component.scss',
})
export class FilterControlsComponent {
  isOpen = false;
  selectedOption = 'Sort by: Featured';
  sortOptions: string[] = [
    'Sort by: Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Rating',
  ];

  @Output() filtersEvent = new EventEmitter<void>();

  constructor(
    private productsService: ProductsService,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(sort: string) {
    this.selectedOption = sort;
    this.isOpen = false;
    this.productsService.updateFilters({ sort });
  }

  toggleFilters() {
    this.filtersEvent.emit();
  }
}