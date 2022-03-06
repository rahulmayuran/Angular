import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userRoute: Router) {

  }
  loginUser() {
    this.userRoute.navigateByUrl('/login');
  }
  registerUser() {
    this.userRoute.navigateByUrl('/register');
  }
  logout() {
    this.userRoute.navigateByUrl('/login');
  }
}

