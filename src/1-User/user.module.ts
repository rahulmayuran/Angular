import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FlightListComponent } from './flight-list/flight-list.component';
import { ManageBookingsComponent } from '../2-Admin/manage-bookings/manage-bookings.component';

import { BrowserModule } from '@angular/platform-browser';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes  = [
  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent}
]

@NgModule({
  declarations: [
    FlightListComponent, ManageBookingsComponent, UserComponent],

  imports: [CommonModule,BrowserModule,UserModule, RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [UserComponent],
  exports : [UserComponent]
})
export class UserModule { }
