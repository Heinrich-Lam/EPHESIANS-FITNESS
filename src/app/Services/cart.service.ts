import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  public cartCount$ = this.cartItemsSubject.pipe(map(items => items.length));

  private cartItems: any[] = [];

  constructor() {
    this.loadCart();
  }

  // Add a product to the cart
  addToCart(product: any, quantity: number, selectedSize: string, selectedColor: string, selectedType?: string) {
    const item = this.cartItems.find(p => p.product.name === product.name && p.size === selectedSize && p.color === selectedColor && p.type === selectedType);
    if (item) {
      item.quantity += quantity; // Update quantity if the product is already in the cart
    } else {
      this.cartItems.push({ product, quantity, size: selectedSize, color: selectedColor, type: selectedType });
    }

    this.updateCartItems(this.cartItems);
    this.saveCart();
  }

  // Get all items in the cart
  getCartItems() {
    return this.cartItems;
  }

  // Remove a product from the cart
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  // Update quantity of a product
  updateQuantity(index: number, quantity: number) {
    this.cartItems[index].quantity = quantity;
    this.saveCart();
  }

  // Clear the entire cart
  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  // Save cart to local storage (persistence)
  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Load cart from local storage
  loadCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  // New method to update cart items
  updateCartItems(items: any[]) {
    this.cartItemsSubject.next(items);
    this.cartItems = [...items];
    this.saveCart();
  }

  // New method to get current cart items
  getCurrentCartItems(): any[] {
    return this.cartItems;
  }
  
}
