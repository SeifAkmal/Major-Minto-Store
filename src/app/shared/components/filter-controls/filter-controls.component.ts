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
  // ===== SORTING ===== \\
  isOpen: boolean = false;
  selectedSort: string = 'Sort by: Featured';
  sortOptions:string[] = ['Sort by: Featured', 'Price: Low to High', 'Price: High to Low', 'Rating'];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  selectItem(item: string) {
    this.selectedSort = item;
    this.isOpen = false;
    this._ProductsService.getSortResults(item);
  }
  // ===== FILTERS TOGGLE EVENT ===== \\
  @Output() filtersEvent = new EventEmitter<void>();

  toggleFilters() {
    this.filtersEvent.emit();
  }
}
