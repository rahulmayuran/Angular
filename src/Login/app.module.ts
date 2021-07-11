import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

// Unique Components - With Search operation
import { AdminComponent } from 'src/2-Admin/admin/admin.component';
import { UserComponent } from 'src/1-User/User/user.component';

//Commonly shared amongst both admin and User.
import { FlightListComponent } from 'src/1-User/flight-list/flight-list.component';
import { HeaderComponent } from 'src/1-User/header/header.component';
import { FooterComponent } from 'src/1-User/footer/footer.component';
import { ManageBookingsComponent } from 'src/2-Admin/manage-flights/manage-flights.component';


const routes:Routes = [
  {path:"", component:LoginComponent},
  {path:"admin", component:AdminComponent},
  {path:"user", component:UserComponent},
  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent}
]

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LoginComponent, 
    UserComponent, AdminComponent, FlightListComponent, ManageBookingsComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
