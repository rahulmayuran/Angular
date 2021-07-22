import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Logging and registrations
import { LoginComponent } from '../6-Other-Components/login/login.component';
import { RegisterComponent } from '../6-Other-Components/register/register.component';

// Unique Components - With Search operation
import { AdminComponent } from 'src/2-Admin/admin.component';
import { UserComponent } from 'src/1-User/user.component';
import { HeaderComponent } from '../6-Other-Components/header/header.component';
import { FooterComponent } from '../6-Other-Components/footer/footer.component';

//Features of both admin and user
import { FlightListComponent } from 'src/2-Admin/flight-list/flight-list.component';
import { ManageFlightsComponent } from 'src/2-Admin/manage-flights/manage-flights.component';
import { ScheduleFlightsComponent } from 'src/2-Admin/schedule-flights/schedule-flights.component';
import { AddFlightComponent } from 'src/2-Admin/add-flight/add-flight.component';
import { ManageBookingsComponent } from 'src/2-Admin/manage-bookings/manage-bookings.component';
import { NgbModule, NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

//When you want service layer to integrate with app, then import HttpClientModule
import { UserService } from 'src/3-Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageDiscountsComponent } from 'src/2-Admin/manage-discounts/manage-discounts.component';
import { HomeComponent } from '../6-Other-Components/home/home.component';



//All routings to browser stems from Routes
//In RouterModule, add this constant to make the routes work

const routes:Routes = [

  //The default url which is localhost:4200 routes to login page
  {path:"", component:LoginComponent},

  //Routing to admin and user distinctively with the search flights as default page.
  {path:"admin", component:AdminComponent},
  {path:"user", component:UserComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"logout", component:HomeComponent},

  //Common features shared amongst both admin and user
  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent},

  //Admin features
  {path:"manageFlights", component:ManageFlightsComponent},
  {path:"manageDiscounts", component:ManageDiscountsComponent},
  {path:"manageSchedule", component:ScheduleFlightsComponent},
  {path:"addAirline", component:AddFlightComponent}
]

@NgModule({

  //All components must be included here
  declarations: [AppComponent,  LoginComponent, 
    UserComponent, AdminComponent, HeaderComponent, FooterComponent, FlightListComponent,
  ManageBookingsComponent,
  RegisterComponent,
  HomeComponent, AddFlightComponent, 
  ManageDiscountsComponent, ScheduleFlightsComponent],

  //All modules must be inclueded here
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, 
    ReactiveFormsModule, NgbModule, HttpClientModule],
  
    //All services must be included here
    providers: [UserService],
  
    //AppComponent is enough to be bootstrapped. 
    bootstrap: [AppComponent],
  exports :[]
})
export class AppModule { }
