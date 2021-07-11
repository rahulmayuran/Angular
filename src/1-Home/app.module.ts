import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './User/user.component';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './Admin/admin.component';

const routes:Routes = [
  {path:"", component:LoginComponent},
  {path:"admin", component:AdminComponent},
  {path:"user", component:UserComponent},
  {path:"flightList",component:FlightListComponent}
]

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LoginComponent, 
    UserComponent, AdminComponent, FlightListComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
