import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { HeaderComponent } from '../header/header.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { FooterComponent } from '../footer/footer.component';

import { Product, updateProductPrices, products } from '../Interfaces/products';
import { CsvService } from '../Services/csv.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, AboutUsComponent, ContactUsComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  //#region "Global Variables."
  @ViewChild('aboutUs') aboutUs!: ElementRef;
  @ViewChild('contactUs') contactUs!: ElementRef;
  
  productCategories = products; 
  selectedCategory: any;
  dropdownOpen = false;
  
  private productIndices: { [key: string]: number } = {};
  selectedOptions: { [key: string]: any } = {};
  selectedQuantity: number = 1;
  
  //#endregion
  
  ngOnInit(): void {
    // Initialize the selected category
    if (this.productCategories.length > 0) {
      this.selectedCategory = this.productCategories[0];
      this.productIndices[this.selectedCategory.title] = 0;
    }
  
    // Call the getPrices function to update product prices
    updateProductPrices(this.csvService, this.productCategories);
  }
  
  //#region "Visible Products."
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  onCategoryChange(): void {
    this.productIndices[this.selectedCategory] = 0;
  }
  
  constructor(private router: Router, private http: HttpClient, private csvService: CsvService) {
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
  
  getVisibleProducts(category: any): any[] {
    if (!category || !category.products) {
      return [];
    }
  
    const startIndex = this.productIndices[category.title] || 0;
    const endIndex = startIndex + 3;
    return category.products.slice(startIndex, endIndex);
  }
  
  
  nextProduct(category: any): void {
    if (!category || !category.products) {
      return;
    }
    const totalProducts = category.products.length;
    if (totalProducts > 3) {
      this.productIndices[category.title] =
        (this.productIndices[category.title] + 3) % totalProducts;
    }
  }
  
  prevProduct(category: any): void {
    if (!category || !category.products) {
      return;
    }
    const totalProducts = category.products.length;
    this.productIndices[category.title] =
      (this.productIndices[category.title] - 3 + totalProducts) % totalProducts;
  }
  
  
  getCurrentPage(category: any): number {
    return Math.floor(this.productIndices[category.title] / 3) + 1;
  }
  
  getTotalPages(category: any): number {
    return Math.ceil(category.products.length / 3);
  }
  //#endregion.
  
  //region "Navigation in the Home Screen."
  onHome(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  onAbout(): void {
    this.scrollToElement(this.aboutUs);
  }
  
  onContact(): void {
    this.scrollToElement(this.contactUs);
  }
  
  private scrollToElement(element: ElementRef) {
    if (element) {
      element.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  //#endregion
  
  //#region "Sign In / Sign Up function."
  onLog(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('access');
    this.router.navigate(['/login']);
  }
  //Shop.
  onShop(): void {
    this.router.navigate(['/shop']);
  }
  //Workouts & Coaching.
  onPrograms(): void {
    this.router.navigate(['/programs']);
  }
  //Order Tracking (Admin use Only.)
  onOrders(): void {
    this.router.navigate(['/orders']);
  }
  //Help & Support.
  onHelp(): void {
    this.router.navigate(['/support']);
  }
  }
