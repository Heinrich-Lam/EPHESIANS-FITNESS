import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SupportComponent } from './support/support.component';
import { ShopComponent } from './shop/shop.component';
import { CartCountComponent } from './cart-count/cart-count.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProgramsComponent } from './programs/programs.component';
import { ColorsComponent } from './colors/colors.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home-page', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home-page', component: HomePageComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: 'support', component: SupportComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'cart', component: CartComponent},
    {path: 'cart-count', component: CartCountComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'programs', component: ProgramsComponent},
    {path: 'colors', component: ColorsComponent},
    {path: 'review', component: ReviewsComponent},
    {path: 'orders', component: OrdersComponent}
];
