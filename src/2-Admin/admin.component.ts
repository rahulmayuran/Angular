import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent
{
  User:string='Admin';
  journey: NgbDateStruct|undefined;
  return: NgbDateStruct|undefined;

  constructor(private adminRouter:Router) {
   }


   navigateToList(){
    this.adminRouter.navigateByUrl('flightList');
   }
   searchFlights(){
    this.adminRouter.navigateByUrl('search');
   }
   manageBookings(){
    this.adminRouter.navigateByUrl('manage');
   }
   manageDiscounts(){
    this.adminRouter.navigateByUrl('manageDiscounts');
   }
   manageFlights(){
    this.adminRouter.navigateByUrl('manageFlights');
   }
   manageSchedule(){
    this.adminRouter.navigateByUrl('manageSchedule');
   }
    addAirline(){
      this.adminRouter.navigateByUrl('addAirline');
    }
    reports(){
      this.adminRouter.navigateByUrl('report');
    }

    logout(){
      this.adminRouter.navigateByUrl('');
    }

}
