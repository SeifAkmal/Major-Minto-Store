import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  private readonly cart = signal<Product[]>([]);

  addProductToCart(product: Product, quantity: number) {
    this.cart.update((currentCart) => {
      const index = currentCart.findIndex((p) => p.id === product.id);

      if (quantity <= 0 && index !== -1) {
        return currentCart.filter((p) => p.id !== product.id);
      }

      if (index == -1) {
        return [...currentCart, { ...product, quantity }];
      }

      return currentCart.map((p) =>
        p.id === product.id ? { ...p, quantity } : p
      );
    });
    console.log(this.cart());
  }

  getQuantity = (id: number) =>
    computed(() => {
      return this.cart().find((p) => p.id === id)?.quantity ?? 0;
    });

  isInCart = (productId: number) =>
    computed(() => {
      return this.cart().some((item) => item.id === productId);
    });
}
