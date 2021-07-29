import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-schedule-flights',
  templateUrl: './schedule-flights.component.html',
  styleUrls: ['./schedule-flights.component.css']
})
export class ScheduleFlightsComponent  {

  schflight:any;
  resultScheduledFlight:any = [];
  time:any = {starttime:'',endtime:''};
  message:string = ''
  flag:boolean = false;

  constructor(private scheduledRouter :Router,public scheduleService : FlightService)
   {

   }

   back()
   {
     this.scheduledRouter.navigateByUrl("/admin")
   }
   
   fetchFlights()
   {
    console.log("Fetching All Flights")
    this.scheduleService.getFlights().subscribe(
      (data:any)=>{
        console.log("Fetched Flights from MySQL ->"+ JSON.stringify(data))
        this.resultScheduledFlight = data;
      }, (err:any)=>{
        this.message = "Failed to Fetch data"
      }
    )
  }

  saveSch(t:any){
    console.log("Value of t" + JSON.stringify(t));
    alert('Flight Scheduled')
    this.schflight = t;
    this.scheduleService.scheduledResultFlight = this.schflight
    this.flag=true;
  }


}
