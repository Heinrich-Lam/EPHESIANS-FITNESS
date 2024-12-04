import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CartService } from '../Services/cart.service';
import { CsvService } from '../Services/csv.service';
import { products, updateProductPrices } from '../Interfaces/products';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { ColorsComponent } from '../colors/colors.component';
import { CartCountComponent } from '../cart-count/cart-count.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ReviewsComponent } from "../reviews/reviews.component";



@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, PopupMessageComponent, ColorsComponent, CartCountComponent, AboutUsComponent, ReviewsComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
//#region "Global Variables."
showNotification: boolean = false;
cartItems: any[] = [];
productCategories = products; 
selectedCategory: any;

private productIndices: { [key: string]: number } = {};
selectedOptions: { [key: string]: any } = {};
selectedQuantity: number = 1;

isFooterVisible: boolean = true;
//#endregion.

constructor(
  private cartService: CartService,
  private router: Router,
  private http: HttpClient,
  private csvService: CsvService
) {
  this.productCategories.forEach((category) => {
    this.productIndices[category.title] = 0;
    category.products.forEach((product) => {
      this.selectedOptions[product.name] = {
        size: product.availableSizes[0],
        type: product.availableTypes[0],
        color: product.availableColors[0],
      };
    });
  });
  this.selectedCategory = this.productCategories[0] || null; 
}

//#region "Display Products."
getVisibleProducts(category: any): any[] {
  const startIndex = this.productIndices[category.title];
  return category.products.slice(startIndex, startIndex + 3); 
}

nextProduct(category: any): void {
  const totalProducts = category.products.length;
  this.productIndices[category.title] =
    (this.productIndices[category.title] + 3) % totalProducts;
}

prevProduct(category: any): void {
  const totalProducts = category.products.length;
  this.productIndices[category.title] =
    (this.productIndices[category.title] - 3 + totalProducts) % totalProducts;
}

onCategoryChange(): void {
  
  this.productIndices[this.selectedCategory] = 0;
}

getVisibleProductsByCategory(categoryTitle: string): any[] {
const category = this.productCategories.find(cat => cat.title === categoryTitle);


if (!category) {
  
  return [];
}

const startIndex = this.productIndices[category.title] || 0; 
return category.products.slice(startIndex, startIndex + 3);
}
//#endregion.

//#region "Product Selection & Cart Functions."
addToCart(
  product: any,
  selectedOptions: { size: string; color: string; type?: string },
  quantity: number
) {
  const { size, color, type } = selectedOptions;
  this.cartService.addToCart(product, quantity, size, color, type);

  alert('Product added to cart!');
  this.showNotification = true;

  setTimeout(() => (this.showNotification = false), 3000);
}

onViewCart(): void {
  this.router.navigate(['/cart']);
}
//#endregion.

getCurrentPage(category: any): number {
  return Math.floor(this.productIndices[category.title] / 3) + 1; 
}

getTotalPages(category: any): number {
  return Math.ceil(category.products.length / 3); 
}

clearCart() {
  this.cartService.clearCart();
  this.cartItems = [];
}

onBack(): void {
  this.clearCart();
  this.router.navigate(['/home-page']);
}

//#region "Color Pallet."

backgroundColor: string = ''; 
defaultBackgroundColor: string = '#af867a'; 

ngOnInit(): void {
  this.resetBackground();
  this.productIndices[this.selectedCategory.title] = 0;

  updateProductPrices(this.csvService, this.productCategories);
}

onColorHover(color: string): void {
  this.backgroundColor = color
    ? this.getColor(color)
    : this.defaultBackgroundColor; 
}

resetBackground(): void {
  document.documentElement.style.setProperty(
    '--order-info-background',
    this.defaultBackgroundColor
  );
  document.documentElement.style.setProperty('--text-color', '#000000'); 
}

getColor(color: string): string {
  const colorMap: { [key: string]: string } = {
    'White': '#FFFFFF',
    'Grey Melange': '#A0A0A0',
    'Slate Grey': '#708090',
    'Charcoal Melange': '#36454F',
    'Graphite Melange': '#4B4B4B',
    'Graphite Grey': '#3A3A3A',
    'Black': '#000000',
    'Emerald': '#50C878',
    'Bottle Green': '#006A4E',
    'Khaki': '#C3B091',
    'Pink': '#FFC0CB',
    'Yellow': '#FFFF00',
    'Orange': '#FFA500',
    'Red': '#FF0000',
    'Burgundy': '#800020',
    'Royal Blue': '#4169E1',
    'Navy Blue': '#000080',
    'Denim Blue': '#1560BD',
  };

  const backgroundColor = colorMap[color] || color;
  document.documentElement.style.setProperty(
    '--order-info-background',
    backgroundColor
  );

  const lightColors = [
    '#FFFFFF',
    '#C3B091',
    '#FFC0CB',
    '#FFFF00',
    '#FFA500',
    '#A0A0A0',
  ];
  const isLightBackground = lightColors.includes(backgroundColor);
  const textColor = isLightBackground ? '#000000' : '#FFFFFF'; 
  document.documentElement.style.setProperty('--text-color', textColor);

  return backgroundColor;
}
//#endregion.

//#region "Navigation in the Page."
private scrollToElement(element: ElementRef) {
  if (element) {
    element.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}

@ViewChild('review') reviews!: ElementRef;

onReview(): void {
  this.scrollToElement(this.reviews);
}
//#endregion
}
