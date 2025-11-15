import { Component } from '@angular/core';
import { SortDropdownComponent } from '../../shared/components/sort-dropdown/sort-dropdown.component';
import { FiltersSidebarComponent } from "../../shared/components/filters-sidebar/filters-sidebar.component";
import { ProductsListComponent } from "../../shared/components/products-list/products-list.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SortDropdownComponent, FiltersSidebarComponent, ProductsListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {}
