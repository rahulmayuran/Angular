import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-schedule-flights',
  templateUrl: './schedule-flights.component.html',
  styleUrls: ['./schedule-flights.component.css']
})
export class ScheduleFlightsComponent  {

  flights:any=[];

  constructor(private flightRouter :Router,public service : FlightService) {

   }

   getFlights()
   {
    this.service.getFlights().subscribe(data=>
      {
      this.flights=data;
      console.log(this.flights);
      });
  }

  addAirline(){
    this.flightRouter.navigateByUrl("/addAirline");
  }

  deleteAirline(flight:any){
    console.log('deleting '+flight.id);
     this.service.deleteFlight(flight.id);
  }

}
