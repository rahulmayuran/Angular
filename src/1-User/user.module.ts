import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';


const userRoutes:Routes  = [
  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent},

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
