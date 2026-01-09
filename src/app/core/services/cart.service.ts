import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public readonly cart = signal<Product[]>([]);

  constructor() {
    this.cart.set(this.getStorage());
  }

  updateCart(product: Product, quantity: number) {
    this.cart.update((currentCart) => {
      const index = currentCart.findIndex((p) => p.id === product.id);

      if (index === -1) {
        return this.addProduct(currentCart, product, quantity);
      }

      if (quantity <= 0) {
        return this.deleteProduct(currentCart, product.id);
      }

      return this.changeQuantity(currentCart, product.id, quantity);
    });

    this.updateStorage(this.cart());
  }

  private updateStorage(cart: Product[]) {
    localStorage.setItem('userCart', JSON.stringify(cart));
  }

  private getStorage(): Product[] {
    const storedCart = localStorage.getItem('userCart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private addProduct(
    currentCart: Product[],
    product: Product,
    quantity: number
  ) {
    return [...currentCart, { ...product, quantity }];
  }

  private deleteProduct(currentCart: Product[], productId: number) {
    return currentCart.filter((p) => p.id !== productId);
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

  subtotal = computed(() =>
    this.cart().reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 0),
      0
    )
  );

  tax = computed(() => {
    const taxRate = 0.08;
    return this.subtotal() * taxRate;
  });

  total = computed(() => {
    return this.subtotal() + this.tax();
  });

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem('userCart');
  }
}
