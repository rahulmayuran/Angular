import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private userRoute: Router,
    private msalService: MsalService) {

  }
  loginUser() {
    this.userRoute.navigateByUrl('/login');
  }
  registerUser() {
    this.userRoute.navigateByUrl('/register');
  }
  logout() {
    // this.userRoute.navigateByUrl('/login');
    this.msalService.logoutRedirect({ postLogoutRedirectUri: environment.logoutUrl })
  }
}

