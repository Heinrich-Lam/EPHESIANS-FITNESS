import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-cart-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-count.component.html',
  styleUrl: './cart-count.component.scss'
})
export class CartCountComponent implements OnInit{
  cartCount$: any;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.cartCount$;
  }

  ngOnInit() {}
}
