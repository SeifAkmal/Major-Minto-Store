import { CartService } from './../../core/services/cart.service';
import { ProductsService } from './../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
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

  productDetails: Product[] = [];
  similarProducts: Product[] = [];
  activatedImage: number = 0;

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.productDetails = this._productsService.productsList.filter(
          (p) => p.id == id
        );
      }
    });

    let category = this.productDetails[0].category;

    this.similarProducts = this._productsService.productsList.filter(
      (p) => p.category == category
    );
  }

  changeThePorduct(id: number) {
    this.productDetails = this._productsService.productsList.filter(
      (p) => p.id === id
    );
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
