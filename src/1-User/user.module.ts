import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { LoginComponent } from 'src/6-Other-Components/login/login.component';
import { StockService } from 'src/3-Services/stock.service';
import { UserComponent } from './user.component';


const userRoutes:Routes  = [
  {path:"flightList",component:FlightListComponent},
  {path:"manage", component:ManageBookingsComponent},

]


@NgModule({
  declarations: [LoginComponent,UserComponent],
  imports: [
    CommonModule, RouterModule.forChild(userRoutes), UserModule
  ],
  providers: [StockService]
})
export class UserModule { }
