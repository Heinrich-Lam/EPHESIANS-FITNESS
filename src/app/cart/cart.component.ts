import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../Services/cart.service';

import { HeaderComponent } from '../header/header.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, PopupMessageComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
//#region "Global Variables."
cartItems: any[] = [];  
showPopup: boolean = false;

@ViewChild(PopupMessageComponent) popup!: PopupMessageComponent;

//#endregion.
constructor(
  private cartService: CartService,
  private router: Router
) {}

ngOnInit(): void {
  this.cartItems = this.cartService.getCartItems();
}

//#region "Shopping Cart Values."
removeItem(index: number) {
  this.cartService.removeFromCart(index);
  this.cartItems = this.cartService.getCartItems(); 
}


updateQuantity(index: number, newQuantity: number) {
  this.cartService.updateQuantity(index, newQuantity);
  this.cartItems = this.cartService.getCartItems(); 
}

getCartTotal() {
  return this.cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

clearCart() {
  this.cartService.clearCart();
  this.cartItems = [];
}
//#endregion.

//#region "Total Price of order."
calculateTotalAmount(): number {
  return this.cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

calculateShippingFee(): number {
  const totalAmount = this.calculateTotalAmount();
  
  if (totalAmount === 0) {
    return 0;
  }
  return totalAmount < 800 ? 50 : 0; 
}
//#endregion.

//Back to products page.
backToProducts(): void {
  this.router.navigate(['shop']);
}

//proceed to the checkout screen.
proceedToCheckout(): void {
  const totalAmount = this.calculateTotalAmount();
  
  if (totalAmount === 0) {
    this.popup.show('Please add an Item to your cart to proceed!');
  }
  else{
    this.router.navigate(['checkout']);
  }
}
}
