import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent
{

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
   manageFlights(){
    this.adminRouter.navigateByUrl('manageFlights');
   }
   manageSchedule(){
    this.adminRouter.navigateByUrl('manageSchedule');
   }
    addAirline(){
      this.adminRouter.navigateByUrl('addAirline');
    }

    logout(){
      this.adminRouter.navigateByUrl('');
    }

}
