import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

// Unique Components - With Search operation
import { AdminComponent } from 'src/2-Admin/admin.component';
import { UserComponent } from 'src/1-User/user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

//Features of both admin and user
import { FlightListComponent } from 'src/2-Admin/flight-list/flight-list.component';
import { ManageFlightsComponent } from 'src/2-Admin/manage-flights/manage-flights.component';
import { ScheduleFlightsComponent } from 'src/2-Admin/schedule-flights/schedule-flights.component';
import { AddFlightComponent } from 'src/2-Admin/add-flight/add-flight.component';
import { ManageBookingsComponent } from 'src/2-Admin/manage-bookings/manage-bookings.component';
import { NgbModule, NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';



const routes:Routes = [
  {path:"", component:LoginComponent},
  {path:"admin", component:AdminComponent},
  {path:"user", component:UserComponent},

  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent},

  {path:"manageFlights", component:ManageFlightsComponent},
  {path:"manageSchedule", component:ScheduleFlightsComponent},
  {path:"addAirline", component:AddFlightComponent}
]

@NgModule({
  declarations: [AppComponent,  LoginComponent, 
    UserComponent, AdminComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, 
    ReactiveFormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
