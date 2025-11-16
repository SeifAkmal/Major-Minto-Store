import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { filterControlsComponent } from '../../shared/components/filter-controls/filter-controls.component';
import { FiltersSidebarComponent } from '../../shared/components/filters-sidebar/filters-sidebar.component';
import { ProductsListComponent } from '../../shared/components/products-list/products-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    filterControlsComponent,
    FiltersSidebarComponent,
    ProductsListComponent,
    NgStyle,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  // ===== FILTER-TOOGLE ===== \\
  filterToggle: boolean = false;
  changeDisplay() {
    this.filterToggle = !this.filterToggle;
  }
}
