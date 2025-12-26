import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { AddToCartComponent } from '../../shared/components/add-to-cart/add-to-cart.component';
import { QuantityCounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ProductsService } from '../../core/services/products.service';
import { StarsPipe } from '../../shared/pipes/stars.pipe';

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
    LoaderComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productId = signal<number | null>(null);
  activeImageIndex = 0;

  smallImages: string[] = [
    '/icons/details-img-1.svg',
    '/icons/details-img-2.svg',
    '/icons/details-img-3.svg',
    '/icons/details-img-4.svg',
  ];

  constructor(
    private route: ActivatedRoute,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (id) {
        this.productId.set(id);
      }
    });
  }

  productDetails = computed(() => {
    const id = this.productId();
    const products = this.productsService.originalProducts();

    if (!id || products.length === 0) return null;

    return products.filter((p) => p.id === id) ?? null;
  });

  similarProducts = computed(() => {
    const product = this.productDetails();
    const products = this.productsService.originalProducts();

    if (!product) return [];

    const categoryProducts = products.filter(
      (p) => p.category === product[0].category
    );

    return categoryProducts.filter((p) => p.id !== product[0].id);
  });

  selectImage(index: number) {
    this.activeImageIndex = index;
  }
}