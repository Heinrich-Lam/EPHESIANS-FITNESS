import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, PopupMessageComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
 //#region "Global Variables."
 orders: any[] = []; 
 orderId: string = ''; 
 orderStatus: string = ''; 
 orderDate: string = ''; 

 showPopup: boolean = false;
 @ViewChild(PopupMessageComponent) popup!: PopupMessageComponent;
 //#endregion.

 constructor(
   private router: Router,
   private http: HttpClient,
   private papa: Papa
 ) {}

 ngOnInit() {
   this.loadOrders(); 
 }

 //#region "Load & Display the orders from teh DB."
 loadOrders() {
  this.http.get('assets/files/OrderSummary.csv', { responseType: 'text' }).subscribe({
    next: (csvData) => {
      this.papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log(result);
          const allOrders = result.data as Array<{
            CartID: string;
            OrderID: string;
            ClientEmail: string;
            SubTotal: string;
            ShippingFee: string;
            FinalTotal: string;
            OrderStatus: string;
            OrderDate: string;
            OrderUpdateDate: string;
          }>;
          // Ensure numeric comparison and date formatting where necessary
          this.orders = allOrders.filter((order) => {
            const matchesOrderId = this.orderId ? order.OrderID === this.orderId : true;
            const matchesOrderStatus = this.orderStatus
              ? Number(order.OrderStatus) === Number(this.orderStatus)
              : true;
            const matchesOrderDate = this.orderDate
              ? new Date(order.OrderDate).toISOString().split('T')[0] === this.orderDate
              : true;
            return matchesOrderId && matchesOrderStatus && matchesOrderDate;
          });

          // Log filtered orders for debugging
          console.log('Filtered Orders:', this.orders);
        },
      });
    },
    error: (err) => {
      console.error('Error reading the CSV file:', err);
      this.popup.show('Error fetching orders! Please contact Administrator.');
    },
  });
}


 //#region "Approve the Selected Order."
 approveOrder(cartId: string): void {
  this.http.post('http://localhost:3000/approve-order', { cartId }).subscribe({
    next: (response: any) => {
      this.popup.show(response.message || 'Order approved successfully.');
      this.loadOrders(); // Reload orders to reflect changes
    },
    error: (error) => {
      this.popup.show(error.message || 'Error approving order.');
    },
  });
}

 //#endregion.

 //#region "Send Shipment Email."
 sendShipmentEmail(orderId: string) {
   const order = this.orders.find((order) => order.CartID === orderId); 

   const emailData = {
     orderid: order.OrderID,
     orderdate: order.OrderDate,
     totalAmount: order.FinalTotal,
     email: order.ClientEmail,
   };

   
   this.http
     .post<{ message: string }>(
       'http://localhost:3000/send-shipment-email',
       emailData
     )
     .subscribe({
       next: (response) => {
         this.popup.show(
           `Shipment details sent successfully for Order ID: ${order.OrderID}`
         );
       },
       error: (error) => {
         this.popup.show(
           `Failed to send shipment details for Order ID: ${order.OrderID}. Error:`
         );
         if (error.error && error.error.message) {
           alert(error.error.message);
         } else {
           this.popup.show(
             'There was an error sending the shipment details. Please try again later.'
           ); 
         }
       },
     });
 }
 //#endregion.
 
 //#region "Update status in DB."
 shipOrder(cartId: string): void {
  this.http.post('http://localhost:3000/ship-order', { cartId }).subscribe({
    next: (response: any) => {
      this.popup.show(response.message || 'Order shipped successfully.');
      this.loadOrders(); // Reload orders to reflect changes
    },
    error: (error) => {
      this.popup.show(error.message || 'Error shipping order.');
    },
  });
}

 //#endregion.

 //Home page navigation.
 goToHome(): void {
   this.router.navigate(['/home-page']); 
 }
}
