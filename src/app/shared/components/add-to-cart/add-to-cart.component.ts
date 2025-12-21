import {
  Component,
  computed,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/interfaces/product';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent implements OnChanges {
  constructor(public cartService: CartService, private snackBar: MatSnackBar) {}

  @Input() product!: Product;
  @Input() buttonSize!: string;

  productId = signal<number | null>(null);

  selectedQuantity!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      const product: Product = changes['product'].currentValue;
      this.updateSignals(product.id);
    }
  }

  updateSignals(id: number) {
    this.productId.set(id);
    this.selectedQuantity = 1;
  }

  isInCartSignal = computed(() => {
    const id = this.productId();
    return id ? this.cartService.isInCart(id)() : false;
  });

  sendProduct(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.updateCart(this.product, this.selectedQuantity);
    this.snackBar.open(this.product.title + ' added to cart', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }
}
