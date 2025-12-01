import { ProductsService } from './../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { StarsPipe } from '../../shared/pipes/stars.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [StarsPipe, CurrencyPipe, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}
  productDetails: Product[] = [];
  ngOnInit(): void {
    const id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this.productDetails = this._ProductsService.productsList.filter(
      (p) => p.id == id
    );
  }
}
