import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './sort-dropdown.component.html',
  styleUrl: './sort-dropdown.component.scss',
})
export class SortDropdownComponent {
  // ===== SORTING ===== \\
  isOpen: boolean = false;
  selectedSort: string = 'Sort by: Featured';
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  selectItem(item: string) {
    this.selectedSort = item;
    this.isOpen = false;
  }
}
