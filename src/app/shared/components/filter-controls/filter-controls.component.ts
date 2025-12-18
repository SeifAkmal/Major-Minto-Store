import { ProductsService } from './../../../core/services/products.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-filter-controls',
  standalone: true,
  imports: [],
  templateUrl: './filter-controls.component.html',
  styleUrl: './filter-controls.component.scss',
})
export class filterControlsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _elementRef: ElementRef
  ) {}

  isOpen: boolean = false;
  selectedOption: string = 'Sort by: Featured';
  sortOptions: string[] = [
    'Sort by: Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Rating',
  ];

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  selectOption(sort: string) {
    this.selectedOption = sort;
    this.isOpen = false;
    this._ProductsService.updateFiltersResults({ sort: sort });
  }

  @Output() filtersEvent = new EventEmitter<void>();

  toggleFilters() {
    this.filtersEvent.emit();
  }
}
