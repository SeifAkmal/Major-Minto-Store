import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  cart: Product[] = [];

  addProductToCart(productToAdd: Product, quantity: number) {
    // USED TO KNOW IF PRODUCT ALREADY EXISTS
    const existingProduct = this.cart.find((p) => p.id === productToAdd.id);

    // USED FOR REMOVAL WHEN QUANTITY IS ZERO
    const index = this.cart.findIndex((p) => p.id == existingProduct?.id);

    if (quantity <= 0) {
      // REMOVE PRODUCT WHEN QUANTITY IS ZERO
      this.cart.splice(index, 1);
    } else if (!existingProduct) {
      // ADD PRODUCT FIRST TIME
      this.cart.push({ ...productToAdd, quantity });
    } else {
      // UPDATE QUANTITY ONLY
      existingProduct.quantity = quantity;
    }

    console.log(this.cart);
  }

  // USED BY UI TO CHECK BUTTON STATE
  isInCart(productId: number) {
    return this.cart.some((item) => item.id === productId);
  }
}
