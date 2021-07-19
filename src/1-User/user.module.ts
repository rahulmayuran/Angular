import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { LoginComponent } from 'src/6-Other-Components/login/login.component';


const userRoutes:Routes  = [
  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent},

]


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
