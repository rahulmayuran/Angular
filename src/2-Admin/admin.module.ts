import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FlightListComponent } from './flight-list/flight-list.component';

import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleFlightsComponent } from './schedule-flights/schedule-flights.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const adminRoutes:Routes  = [
  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent}
]

@NgModule({
  declarations: [
    FlightListComponent, ManageBookingsComponent, AdminComponent, ScheduleFlightsComponent, AddFlightComponent],
  imports: [CommonModule,BrowserModule,AdminModule, RouterModule.forRoot(adminRoutes),
    FormsModule, ReactiveFormsModule, NgbModule],
  providers: [],
  bootstrap: [AdminComponent],
  exports : [AdminComponent]
})
export class AdminModule { }
