import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
  constructor(private router: Router){}

  onHome(): void{
    this.router.navigate(['/home-page']);
}
}
