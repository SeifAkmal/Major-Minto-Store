import { NgStyle } from '@angular/common';
import { ProductsService } from './../../../core/services/products.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-controls',
  standalone: true,
  imports: [],
  templateUrl: './filter-controls.component.html',
  styleUrl: './filter-controls.component.scss',
})
export class filterControlsComponent {
  constructor(private _ProductsService: ProductsService) {}
  // ALL ABOUT SORTING
  isOpen: boolean = false;
  selectedOption: string = 'Sort by: Featured';
  sortOptions:string[] = ['Sort by: Featured', 'Price: Low to High', 'Price: High to Low', 'Rating'];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  selectOption(sort: string) {
    this.selectedOption = sort;
    this.isOpen = false;
    this._ProductsService.updateFiltersResults({sort:sort});
  }
  // FILTERS TOGGLE EVENT
  @Output() filtersEvent = new EventEmitter<void>();

  toggleFilters() {
    this.filtersEvent.emit();
  }
}
