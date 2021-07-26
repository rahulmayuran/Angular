import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from 'src/3-Services/flight.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'], 
  providers : [FlightService]
})
export class UserComponent implements OnInit
{

  ngOnInit(): void
   {
     this.fetchJourneyAndDepartureFromFlights();
  }

  searchForm:FormGroup
  flightsToSearch:any=[];
  resultFlight:any = [];
  resultFlightBasedOnSearch:any = [];
  errmessage:string = '';

  bookForm:FormGroup
  passenger:any = [];

  constructor(private router:Router,private flightservice:FlightService) {
    
    this.searchForm = new FormGroup({
      journey : new FormControl("" , Validators.required),
      destination : new FormControl("" , Validators.required)
    })
    this.bookForm = new FormGroup({
      //Add all models of the form
    })

   }
 

   SearchFlightsByPlace(journey:string,destination:string)
   {
    this.flightservice.getFilteredFlights(journey,destination).subscribe(
      (data) => {
        this.resultFlightBasedOnSearch = data;
        console.log(JSON.stringify(data));
      }
    )
   }

   fetchJourneyAndDepartureFromFlights()
   {
  
    console.log("Fetching All Flights")
    this.flightservice.getFlights().subscribe(
      (data:any)=>{
        console.log("Fetched Journey from MySQL ->"+ JSON.stringify(data.journey) +
        "Fetched Destination "+ JSON.stringify(data.destination));
        this.resultFlight = data;
      }, (err:any)=>{
        this.errmessage = "Failed to Fetch data"
      }
    )
  }

  bookFlightAddPassengers()
  {
    this.passenger.push({passengerName:'',passengerEmail:'',passengerAge:'',passengerContact:'',passengerPreferences:''});
  }

  popPassengers(){
    this.passenger.pop({passengerName:'',passengerEmail:'',passengerAge:'',passengerContact:'',passengerPreferences:''});
  }

  navigateToList(){
    this.router.navigateByUrl('flightList');
   }
   searchFlights(){
    this.router.navigateByUrl('search');
   }
   manageBookings(){
    this.router.navigateByUrl('manage');
   }
   logout(){
     this.router.navigateByUrl('logout');
   }

 
}
