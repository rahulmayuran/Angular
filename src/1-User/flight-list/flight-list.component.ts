import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent  {

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
