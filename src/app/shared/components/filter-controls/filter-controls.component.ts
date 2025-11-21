import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-controls',
  standalone: true,
  imports: [],
  templateUrl: './filter-controls.component.html',
  styleUrl: './filter-controls.component.scss',
})
export class filterControlsComponent {
  // ===== SORTING TOOGLE  ===== \\
  isOpen: boolean = false;
  selectedSort: string = 'Sort by: Featured';
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  selectItem(item: string) {
    this.selectedSort = item;
    this.isOpen = false;
  }
  // ===== FILTERS TOGGLE EVENT ===== \\
  @Output() filtersEvent = new EventEmitter<void>();

  toggleFilters() {
    this.filtersEvent.emit();
  }
}
