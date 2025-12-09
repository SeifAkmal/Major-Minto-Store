import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quantity-counter',
  standalone: true,
  imports: [],
  templateUrl: './quantity-counter.component.html',
  styleUrl: './quantity-counter.component.scss',
})
export class QuantityCounterComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute
  ) {}

  @Input() product!: Product;

  // HOLDS CURRENT QUANTITY FOR THIS PRODUCT
  selectedQuantity!: any;

  ngOnInit(): void {
    // UPDATE QUANTITY WHEN ROUTE PARAM CHANGES (DETAIL PAGE)
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.selectedQuantity = this._cartService.getQuantity(id);
    });

    // INITIAL QUANTITY FOR LIST VIEW / NON-ROUTED USAGE
    this.selectedQuantity = this._cartService.getQuantity(this.product.id);
  }

  minusProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedQuantity > 0) {
      this.selectedQuantity--;
      // SYNC UPDATED QUANTITY WITH CART
      this._cartService.addProductToCart(this.product, this.selectedQuantity);
    }
  }

  plusProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedQuantity < 10) {
      this.selectedQuantity++;
    }

    // SYNC UPDATED QUANTITY WITH CART
    this._cartService.addProductToCart(this.product, this.selectedQuantity);
  }
}
