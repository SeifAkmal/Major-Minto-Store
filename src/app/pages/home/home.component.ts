import { Component, HostListener, OnInit } from '@angular/core';
import { FilterControlsComponent } from '../../shared/components/filter-controls/filter-controls.component';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { ProductsListComponent } from '../../shared/components/products-list/products-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FilterControlsComponent,
    FilterSidebarComponent,
    ProductsListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isSidebarOpen = true;

  ngOnInit(): void {
    this.checkScreen();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  changeDisplay() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private checkScreen() {
    const tabletBreakpoint = 964;
    this.isSidebarOpen = window.innerWidth >= tabletBreakpoint;
  }
}