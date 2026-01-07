import { ProductsService } from './../../../core/services/products.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  public productsService = inject(ProductsService);
}
