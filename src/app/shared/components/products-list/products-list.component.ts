import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/interfaces/product';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  constructor(public ProductsService: ProductsService) {}
  // ===== GET-PRODUCTS ===== \\
  productsList: Product[] = [];
  ngOnInit(): void {
    this.productsList = this.ProductsService.getProducts();
  }
  // ===== GET-STARS ===== \\
  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  // ===== PRODUCT-NAV ===== \\
  reOrderProducts(maxShow?: number) {
    this.productsList = this.ProductsService.getProducts().slice(0, maxShow);
  }
  @ViewChild('firstButton') firstButton!: ElementRef;
  ngAfterViewInit() {
    this.firstButton.nativeElement.focus();
  }
}
