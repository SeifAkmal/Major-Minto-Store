import { Component, HostListener, OnInit } from '@angular/core';
import { filterControlsComponent } from '../../shared/components/filter-controls/filter-controls.component';
import { ProductsListComponent } from '../../shared/components/products-list/products-list.component';
import { FilteridebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    filterControlsComponent,
    FilteridebarComponent,
    ProductsListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // ===== FILTERS TOOGLE ===== \\
  isSidebarOpen: boolean = true;
  changeDisplay() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  ngOnInit(): void {
    this.checkScreen();
  }
  @HostListener('window:resize') callCheck() {
    this.checkScreen();
  }
  checkScreen() {
    const tabletBreakpoint = 964;
    if (window.innerWidth < tabletBreakpoint) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }
}
