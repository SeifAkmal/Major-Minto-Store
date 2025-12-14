import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  private readonly cart = signal<Product[]>([]);

  updateCart(product: Product, quantity: number) {
    this.cart.update((currentCart) => {
      const index = currentCart.findIndex((p) => p.id === product.id);

      if (quantity <= 0 && index !== -1) {
        return this.deleteProduct(currentCart, product.id);
      }

      if (index === -1) {
        return this.addProduct(currentCart, product, quantity);
      }

      return this.changeQuantity(currentCart, product.id, quantity);
    });

    console.log(this.cart());
  }

  private deleteProduct(currentCart: Product[], productId: number) {
    return currentCart.filter((p) => p.id !== productId);
  }

  private addProduct(
    currentCart: Product[],
    product: Product,
    quantity: number
  ) {
    return [...currentCart, { ...product, quantity }];
  }
  private changeQuantity(
    currentCart: Product[],
    productId: number,
    quantity: number
  ) {
    return currentCart.map((p) =>
      p.id === productId ? { ...p, quantity } : p
    );
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
