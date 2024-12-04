import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, PopupMessageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  //#region "Global Variables."
  @Input() accessLevel: boolean = false;
  menuOpen: boolean = false;
  currentRoute: string = '';
  showPopup: boolean = false;
  //#endregion.

  @ViewChild(PopupMessageComponent) popup!: PopupMessageComponent

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });

    const access = localStorage.getItem('access');
    this.accessLevel = access === 'True';
  }

  //Burger Menu Selection.
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  //Home Page
  onHome() {
    this.router.navigate(['/home-page']);
  }

  //About Page
  onAbout() {
    this.router.navigate(['/about-us']);
  }

  //Contact Us Page
  onContact() {
    this.router.navigate(['/contact-us']);
  }

  //Different Navigation based on the route the nav comes from.
  handleNavigation(sectionId: string): void {
    if (sectionId === 'about-us' || sectionId === 'contact-us') {
      if (this.router.url === '/home-page' || this.router.url === '/') {
        this.scrollToSection(sectionId);
      } else {
        this.router.navigate([`/${sectionId}`]);
      }
    }
  }

  handleReview(sectionId: string): void {
    if (sectionId === 'review') {
      if (this.router.url === '/shop' || this.router.url === '/') {
        this.scrollToSection(sectionId);
      } else {
        this.router.navigate([`/${sectionId}`]);
      }
    }
  }

  //Scroll to the section if the section is in the current page.
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //Help & Support Page.
  onHelp() {
    this.router.navigate(['/support']);
  }

  //Shop
  onShop() {
    this.router.navigate(['/shop']);
  }

  //Review
  onReview() {
    this.router.navigate(['/review']);
  }

  //Workouts & Coaching Page.
  onPrograms() {
    this.router.navigate(['/programs']);
  }

  //Sign Up / Sign In Page.
  onLog() {    
    localStorage.removeItem('token');
    localStorage.removeItem('access');
    this.popup.show('This fucntion is still in development!');
    //this.router.navigate(['/login']);
  }

  //Order tracking Page. (Admin use only.)
  onOrders() {
    this.router.navigate(['/orders']);
  }
}
