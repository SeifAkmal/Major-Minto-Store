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

    const index = this.cart.findIndex((p) => p.id == existingProduct?.id);

    if (quantity <= 0) {
      this.cart.splice(index, 1);
    } else if (!existingProduct) {
      this.cart.push({ ...productToAdd, quantity });
    } else {
      existingProduct.quantity = quantity;
    }

    console.log(this.cart);
  }

  getQuantity(id: number) {
    const item = this.cart.find((p) => p.id === id);
    return item ? item.quantity : 0;
  }

  isInCart(productId: number) {
    return this.cart.some((item) => item.id === productId);
  }
}
