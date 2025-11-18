import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { filterControlsComponent } from '../../shared/components/filter-controls/filter-controls.component';
import { FiltersSidebarComponent } from '../../shared/components/filters-sidebar/filters-sidebar.component';
import { ProductsListComponent } from '../../shared/components/products-list/products-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    filterControlsComponent,
    FiltersSidebarComponent,
    ProductsListComponent,
    NgStyle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // ===== FILTER-TOOGLE ===== \\
  filterToggle: boolean = false;
  changeDisplay() {
    this.filterToggle = !this.filterToggle;
  }
}
