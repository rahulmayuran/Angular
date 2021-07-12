import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent
{

  
  journey: NgbDateStruct|undefined;
  return: NgbDateStruct|undefined;

  constructor(private adminRouter:Router) { }

  navigateToList(){
    this.adminRouter.navigateByUrl('flightList');
   }
   searchFlights(){
    this.adminRouter.navigateByUrl('search');
   }
   manageBookings(){
    this.adminRouter.navigateByUrl('manage');
   }
   logout(){
     this.adminRouter.navigateByUrl('');
   }

 
}
