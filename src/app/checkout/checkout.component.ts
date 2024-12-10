import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, switchMap, tap } from 'rxjs';

import { CartService } from '../Services/cart.service';
import { CsvService } from '../Services/csv.service';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { OrderParameters } from '../Parameters/OrderParameters';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, PopupMessageComponent, FooterComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
//#region "Global Variables."

showPopup: boolean = false;
showLoading: boolean = false;
cartItems: any[] = [];
PRODUCTid: string = '';
PRODUCTquantity: number = 0;
CARTID: any;
ORDERID: any;
currentDate: Date = new Date();

@ViewChild(PopupMessageComponent) popup!: PopupMessageComponent;

userInfo = {
  name: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};
paymentInfo = {
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

//#endregion.

constructor(
  private cartService: CartService,
  private router: Router,
  private http: HttpClient,
  private csvService: CsvService
) {}

ngOnInit(): void {
  this.cartItems = this.cartService.getCartItems();
  this.getCartItems();
}

//#region "Cart Item Population."
getCartItems(): void {
  const cartItems = this.cartService.getCurrentCartItems();

  cartItems.forEach((item, index) => {
    const { product, size, color, type, quantity } = item;

    const ProductName = product.name;
    const ProductSize = size;
    const ProductColor = color;
    const ProductType = type;
    const ProductQuantity = quantity;
    const ProductPrice = product.price;

    // Populate the properties for the checkout screen
    this.PRODUCTquantity = ProductQuantity;
    this.PRODUCTid = `${ProductName}-${ProductSize}-${ProductColor}-${ProductType}-${index}`; // Example for unique ID
    console.log(`Item ${index + 1}:`, {
      ProductName,
      ProductSize,
      ProductColor,
      ProductType,
      ProductQuantity,
      ProductPrice,
    });
  });
}

//#endregion

//#region "Prices and Totals."
calculateTotalAmount(): number {
  return this.cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

calculateShippingFee(): number {
  const totalAmount = this.calculateTotalAmount();
  return totalAmount < 800 ? 50 : 0;
}

calculateTotalCartAmount(): number {
  const shippingFee = this.calculateShippingFee();
  const cartTotalExShipping = this.calculateTotalAmount();
  const finalCartTotal = cartTotalExShipping + shippingFee;

  return finalCartTotal;
}
//#endregion.

//#region "Getting ID's from DB."
getCartID(): void {
  const newItemID = Math.floor(100000 + Math.random() * 900000);

  // Fetch CSV data to check if the ID already exists
  this.csvService.fetchCsvData('assets/files/CartID.csv').subscribe({
    next: (csvData) => {
      const existingItem = csvData.find((item: any) => item.CART_ID === newItemID.toString());

      if (!existingItem) {
        // If the ID doesn't exist, update the CSV file
        this.csvService.updateCartIDOnServer(newItemID.toString()).subscribe({
          next: (response) => {
            if (response.message === 'CSV file updated successfully') {
              this.CARTID = newItemID;
              console.log('New CART_ID added to CSV:', this.CARTID);
            }
          },
          error: (error) => {
            console.error('Error updating CSV file:', error);
          },
        });
      } else {
        // If the ID exists, generate a new one and try again
        console.log('Duplicate CART_ID found. Generating a new one.');
        this.getCartID();
      }
    },
    error: (error) => {
      console.error('Error fetching CSV data:', error);
    },
  });
}

getOrderID(): void {
  const newItemID = Math.floor(100000 + Math.random() * 900000);

  // Fetch CSV data to check if the ID already exists
  this.csvService.fetchCsvData('assets/files/OrderID.csv').subscribe({
    next: (csvData) => {
      const existingItem = csvData.find((item: any) => item.ORDER_ID === newItemID.toString());

      if (!existingItem) {
        // If the ID doesn't exist, update the CSV file
        this.csvService.updateOrderIDOnServer(newItemID.toString()).subscribe({
          next: (response) => {
            if (response.message === 'CSV file updated successfully') {
              this.ORDERID = newItemID;
              console.log('New ORDER_ID added to CSV:', this.ORDERID);
            }
          },
          error: (error) => {
            console.error('Error updating CSV file:', error);
          },
        });
      } else {
        // If the ID exists, generate a new one and try again
        console.log('Duplicate ORDER_ID found. Generating a new one.');
        this.getOrderID();
      }
    },
    error: (error) => {
      console.error('Error fetching CSV data:', error);
    },
  });
}

//#endregion.

//#region "Submission of Order."
onSubmit(form: NgForm) {
  this.showLoading = true;

  this.getCartID();
  this.getOrderID();

  setTimeout(() => {
    if (form.valid && this.CARTID) {
      const totalAmount = this.calculateTotalAmount();
      const shippingFee = this.calculateShippingFee();
      const finalTotal = this.calculateTotalCartAmount();

      const orderData = this.cartItems.map((item) => ({
        OrderID: this.ORDERID,
        FullName: this.userInfo.name,
        Email: this.userInfo.email,
        ShippingAddress: this.userInfo.address,
        City: this.userInfo.city,
        State: this.userInfo.state,
        ZipCode: this.userInfo.zip,
        CartID: this.CARTID,
        ProductID: item.product.name,
        Size: item.size,
        Color: item.color,
        Type: item.type,
        Quantity: item.quantity,
        SubTotal: totalAmount,
        ShippingFee: shippingFee,
        FinalTotal: finalTotal,
        OrderStatus: 'Pending',
        OrderDate: this.currentDate
      }));

      const summaryData = {
        CartID: this.CARTID,
        OrderID: this.ORDERID,
        ClientEmail: this.userInfo.email,
        SubTotal: totalAmount,
        ShippingFee: shippingFee,
        FinalTotal: finalTotal,
        OrderStatus: 'Pending',
        OrderDate: this.currentDate,
        OrderUpdateDate: this.currentDate // Initially the same as OrderDate
      };

      // Send order data to the server
      this.http.post('http://localhost:3000/add-order', { orderData }).subscribe({
        next: () => {
          // Send summary data to the second endpoint
          this.http.post('http://localhost:3000/add-order-summary', { summaryData }).subscribe({
            next: () => {
              this.sendEmail(form);
              this.popup.show('Order has been placed successfully!');
              form.reset();
              this.clearCart();
              this.showLoading = false;
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 3000);
            },
            error: (error) => {
              console.error('Error saving order summary to CSV:', error);
              this.popup.show('Failed to save order summary. Please try again.');
              this.showLoading = false;
            },
          });
        },
        error: (error) => {
          console.error('Error saving order to CSV:', error);
          this.popup.show('Failed to place order. Please try again.');
          this.showLoading = false;
        },
      });
    } else {
      this.popup.show('Please fill in all required fields!');
      this.showLoading = false;
    }
  }, 1500);
}

//#endregion.

//#region "Validation."
validateZip(zip: string): boolean {
  const zipPattern = /^\d{5}(-\d{4})?$/;
  return zipPattern.test(zip);
}

validateEmail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

emailFocused = false;
onEmailFocus() {
  this.emailFocused = true;
}

onExpiryInput(event: Event): void {
  let input = (event.target as HTMLInputElement).value;

  input = input.replace(/\D/g, '');

  if (input.length > 2) {
    input = input.substring(0, 2) + '/' + input.substring(2, 4);
  }

  this.paymentInfo.expiry = input;
}

formattedCardNumber: string = '';

formatCardNumber(value: string | null): void {
  if (!value) {
    this.formattedCardNumber = '';
    return;
  }

  const digits = value.replace(/\D/g, '');
  const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1-');
  this.formattedCardNumber = formatted;
}
//#endregion.

//#region "Emails."
sendEmail(form: NgForm) {
  const orderid = this.ORDERID;
  if (form.valid) {
    const { name, email, address, city, state, zip } = form.value;

    const shippingFee = this.calculateShippingFee();
    const totalAmount = this.calculateTotalCartAmount();

    const cartDetails = this.cartItems.map((item) => ({
      name: item.product.name,
      size: item.size,
      color: item.color,
      type: item.type,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    }));

    const formData = {
      name,
      email,
      address,
      city,
      state,
      zip,
      orderid,
      shippingFee,
      totalAmount,
      cartItems: cartDetails,
    };

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/send-payment-email',
        formData
      )
      .subscribe({
        next: (response) => {
          this.popup.show('Order has been placed successfully!');
          form.reset();
          this.clearCart();
          setTimeout(() => {
            this.router.navigate(['/home-page']);
          }, 3000);
        },
        error: (error) => {
          this.popup.show('Failed to place order. Error:');

          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            this.popup.show(
              'There was an error placing your order. Please try again later.'
            );
          }
        },
      });
  } else {
    this.popup.show('Please fill in all required fields.');
  }
}
//#endregion.

backToCart() {
  this.router.navigate(['cart']);
}

clearCart() {
  this.cartService.clearCart();
  this.cartItems = [];
}
}
