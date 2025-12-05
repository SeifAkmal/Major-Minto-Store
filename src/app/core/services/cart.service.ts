import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cart: Product[] = [];

  addProductToCart(productToAdd: Product, quantity: number) {
    const existingProduct = this.cart.find((p) => p.id === productToAdd.id);

    if (!existingProduct) {
      this.cart.push({ ...productToAdd, quantity });
    } else {
      existingProduct.quantity = quantity;
    }

    console.log(this.cart);
  }
}
