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
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {}

  // HOLDS CURRENT PRODUCT DATA
  productDetails: Product[] = [];

  // USED TO SHOW ITEMS FROM SAME CATEGORY
  similarProducts: Product[] = [];

  ngOnInit(): void {
    // GET PRODUCT ID FROM ROUTE
    const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    // LOAD PRODUCT BY ID
    this.productDetails = this._productsService.productsList.filter(
      (p) => p.id == id
    );

    // CATEGORY USED TO FETCH SIMILAR ITEMS
    let category = this.productDetails[0].category;

    // LOAD SIMILAR PRODUCTS BASED ON CATEGORY
    this.similarProducts = this._productsService.productsList.filter(
      (p) => p.category == category
    );
  }

  // SMALL IMAGE THUMBNAILS FOR PRODUCT GALLERY
  smallImages: string[] = [
    '/icons/details-img-1.svg',
    '/icons/details-img-2.svg',
    '/icons/details-img-3.svg',
    '/icons/details-img-4.svg',
  ];

  // USED TO HIGHLIGHT ACTIVE GALLERY IMAGE
  activatedImage: number = 0;

  selectImage(index: number) {
    this.activatedImage = index;
  }

  // UPDATE DETAILS WHEN USER SELECTS A DIFFERENT PRODUCT
  changeThePorduct(id: number) {
    this.productDetails = this._productsService.productsList.filter(
      (p) => p.id === id
    );
  }
}
