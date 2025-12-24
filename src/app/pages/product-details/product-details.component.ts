import { ProductsService } from './../../core/services/products.service';
import { Component, computed, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { StarsPipe } from '../../shared/pipes/stars.pipe';
import { CurrencyPipe, NgClass } from '@angular/common';
import { AddToCartComponent } from '../../shared/components/add-to-cart/add-to-cart.component';
import { QuantityCounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    StarsPipe,
    CurrencyPipe,
    RouterLink,
    NgClass,
    AddToCartComponent,
    QuantityCounterComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  productId = signal<number | null>(null);
  activatedImage: number = 0;

  productDetails = computed(() => {
    const id = this.productId();
    const products = this._productsService.originalProducts();

    if (!id || products.length === 0) return null;

    return products.filter((p) => p.id === id) ?? null;
  });
  similarProducts = computed(() => {
    const product = this.productDetails();
    const products = this._productsService.originalProducts();

    if (!product) return [];

    const categoryProducts = products.filter((p) => p.category == product[0].category);

    return categoryProducts.filter((p) => p.id !== product[0].id);
  });

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (id) {
        this.productId.set(id);
      }
    });
  }

  smallImages: string[] = [
    '/icons/details-img-1.svg',
    '/icons/details-img-2.svg',
    '/icons/details-img-3.svg',
    '/icons/details-img-4.svg',
  ];

  selectImage(index: number) {
    this.activatedImage = index;
  }
}
