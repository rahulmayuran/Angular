import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/3-Services/booking.service';
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
  // flightsToSearch:any=[];
  resultFlight:any = {journey:'', destination:''};
  resultFlightForDropDown:any = [];
  resultFlightBasedOnSearch:any = [];
  errmessage:string = '';

  bookForm:FormGroup
  passenger:any = [];
  message:any; 

  constructor(private router:Router,private flightservice:FlightService, private bookingService:BookingService) {
    
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
     console.log("Journey and Destination -> "+ journey + "|"+destination)
     console.log("Result Flight array contains "+this.resultFlight)
    this.flightservice.getFilteredFlights(journey,destination).subscribe(
      (data) => {
        this.resultFlightBasedOnSearch = data;
        console.log(JSON.stringify(data));
      }
    )
   }

  //  Drop Down Fetching
   fetchJourneyAndDepartureFromFlights()
   {
  
    console.log("Fetching All Flights")
    this.flightservice.getFlights().subscribe(
      (data:any)=>{
        console.log("Fetched Journey from MySQL ->"+ JSON.stringify(data.journey) +
        "Fetched Destination "+ JSON.stringify(data.destination));
        this.resultFlightForDropDown = data;
      }, (err:any)=>{
        this.errmessage = "Failed to Fetch data"
      }
    )
  }

  // All Booking operations
  addPassengers()
  {
    this.passenger.push({passengerName:'',passengerEmail:'',passengerAge:'',passengerContact:'',passengerPreferences:''});
  }

  popPassengers(){
    this.passenger.pop({passengerName:'',passengerEmail:'',passengerAge:'',passengerContact:'',passengerPreferences:''});
  }

  SavePassenger(passenger:any)
  {

    if(this.checkPassengers()){
      return
    }
    else
    {
      this.bookingService.savePassenger(passenger).subscribe( 
         (data:any)=>
       {
        data = this.passenger;
        console.log("Successfully saved passenger->"+ JSON.stringify(data))
      });
      }
  }

  deletePassenger(passengerId:number)
  {
    console.log("delete the Passenger with id "+passengerId);
    this.bookingService.deletePassengerWithId(passengerId);
  }

  // flagForBookForm(){
  //   this.passenger = [];
  // }

  checkPassengers():boolean
  {
    if(this.passenger.passengerName == '' || this.passenger.passengerEmail==''
        || this.passenger.passengerPreferences=='')
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }

  // Routing operations
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
