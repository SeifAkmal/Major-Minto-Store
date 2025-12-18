import { Component } from '@angular/core';
import { QuantityCounterComponent } from "../../shared/components/quantity-counter/quantity-counter.component";
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [QuantityCounterComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService:CartService) {
    
  }

}
