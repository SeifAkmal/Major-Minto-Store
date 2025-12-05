import { CartService } from './../../core/services/cart.service';
import { ProductsService } from './../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { StarsPipe } from '../../shared/pipes/stars.pipe';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [StarsPipe, CurrencyPipe, RouterLink, NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {}
  productDetails: Product[] = [];
  similarProducts: Product[] = [];

  ngOnInit(): void {
    // GET PRODUCT DETAILS THEN SAVE THE CATEGORY TYPE
    const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.productDetails = this._productsService.productsList.filter(
      (p) => p.id == id
    );
    let category = this.productDetails[0].category;

    this.similarProducts = this._productsService.productsList.filter(
      (p) => p.category == category
    );
  }

  smallImages: string[] = [
    '/icons/details-img-1.svg',
    '/icons/details-img-2.svg',
    '/icons/details-img-3.svg',
    '/icons/details-img-4.svg',
  ];
  activatedImage: number = 0;
  selectImage(index: number) {
    this.activatedImage = index;
  }

  changeThePorduct(id: number) {
    this.productDetails = this._productsService.productsList.filter(
      (p) => p.id === id
    );
  }

  // ADD TO CART

  productQuantity: number = 1;

  minusProduct() {
    if (this.productQuantity !== 1) {
      this.productQuantity--;
    }
  }
  plusProduct() {
    if (this.productQuantity !== 10) {
      this.productQuantity++;
    }
  }
  sendProductToCart(item: Product) {
    this._cartService.addProductToCart(item, this.productQuantity);
  }
}
