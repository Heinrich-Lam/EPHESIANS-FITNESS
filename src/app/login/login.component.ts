import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { PapaParseParser } from 'ngx-papaparse';

import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PopupMessageComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
//#region "Global Variables."

loginForm: FormGroup;
errorMessage: string = '';
showPopup: boolean = false;

isFooterVisible: boolean = true;
//#endregion

@ViewChild(PopupMessageComponent) popup!: PopupMessageComponent;

constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private papa: Papa) {
  
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}

//#region "DB Call to check access of the account."
onAccess(): void {
  if (this.loginForm.invalid) {
    this.popup.show('Please fill in all required fields!');
    return;
  }

  const username = this.loginForm.value.username;
  const password = this.loginForm.value.password;

  this.http.get('assets/files/Credentials.csv', { responseType: 'text' }).subscribe({
    next: (csvData) => {
      this.papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const credentials = result.data as Array<{ USERNAME: string; PASSWORD: string; ACCESS: string }>;
          const user = credentials.find((cred) => cred.USERNAME === username && cred.PASSWORD === password);

          if (user) {
            localStorage.setItem('access', user.ACCESS);
          } else {
            this.popup.show('Invalid username or password.');
          }
        },
      });
    },
    error: (err) => {
      this.errorMessage = err.message || 'An error occurred while reading credentials.';
      this.popup.show(this.errorMessage);
    },
  });
}
//#endregion.

//#region "Login to Website with Creds."
onLogin(): void {
  if (this.loginForm.invalid) {
    this.popup.show('Please fill in all required fields!');
    return;
  }

  const username = this.loginForm.value.username;
  const password = this.loginForm.value.password;

  // Fetch and parse the CSV file
  this.http.get('assets/files/Credentials.csv', { responseType: 'text' }).subscribe({
    next: (csvData) => {
      this.papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const credentials = result.data as Array<{ USERNAME: string; PASSWORD: string; TOKEN: string }>;
          const user = credentials.find((cred) => cred.USERNAME === username && cred.PASSWORD === password);

          if (user) {
            //localStorage.setItem('token', user.TOKEN || '');
            this.router.navigate(['/home-page']);
          } else {
            this.popup.show('Invalid username or password.');
          }
        },
      });
    },
    error: (err) => {
      this.errorMessage = err.message || 'An error occurred while reading credentials.';
      this.popup.show(this.errorMessage);
    },
  });
}

//#endregion

//Geust Login
onGuest(): void{
  this.router.navigate(['/home-page']);
}

//Register New User.
onRegister(): void{
  this.router.navigate(['/user']);
}
}
