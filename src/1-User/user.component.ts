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
     this.fetchDiscounts();
  }
// Search operations
  searchForm:FormGroup
  resultFlight:any = {journey:'', destination:'',startDate:'',endDate:''};
  resultFlightForDropDown:any = [];
  resultFlightBasedOnSearch:any = [];
  selectedFlight:any;
  errmessage:string = '';

  // Booking operations
  bookForm:FormGroup
  passenger:any = [];
  message:any; 

  // Discount related operations
  resultDiscounts:any = [];
  discountStr:any;
  priceStr:any;
  discountedpriceStr:any;

  //Ticket Booking operations
  booking:any = [];
  ticketGen:any;
  PNRnumber:any;
  

  constructor(private router:Router,private flightservice:FlightService, private bookingService:BookingService) {
    
    this.searchForm = new FormGroup({
      journey : new FormControl("" , Validators.required),
      destination : new FormControl("" , Validators.required),
      startDate : new FormControl("" , Validators.required),
      endDate : new FormControl("" , Validators.required)
    })
    this.bookForm = new FormGroup({
      passengerName : new FormControl("", Validators.required),
      passengerEmail : new FormControl("", Validators.required),
      passengerAge : new FormControl("", Validators.required),
      passengerContact : new FormControl("", Validators.required),
      passengerPreferences : new FormControl("", Validators.required),
      discountStr : new FormControl("", Validators.required)
    })

   }
 

   SearchFlightsByPlace(journey:string,destination:string)
   {
     this.resultFlightBasedOnSearch = [];
     console.log("Journey and Destination -> "+ journey + "|"+destination)
     console.log("Result Flight array contains "+ JSON.stringify(this.resultFlight))
     
    this.flightservice.getFilteredFlights(journey,destination).subscribe(
      (data:any) => {

        let flights = data;
        console.log(JSON.stringify(data));
        flights.forEach((s:any)=>{
            console.log(s.startDate)
            console.log(this.resultFlight.startDate)
          if(s.startDate == this.resultFlight.startDate)
            {
              // s.startTime = this.flightservice.scheduledResultFlight.starttime
              // s.endTime = this.flightservice.scheduledResultFlight.endTime
              this.resultFlightBasedOnSearch.push(s);
              console.log(JSON.stringify(this.searchFlights));
              }
              else
              {
                alert("seems like you missed something")
              }
        })
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
renderBooking(f:any){
  this.selectedFlight = f;
  console.log("Rendered bookings for flight "+f);
  this.addPassengers();
}

  addPassengers()
  {
    this.passenger.push({passengerName:'',passengerEmail:'',passengerAge:'',passengerContact:'',passengerPreferences:''});
    this.priceStr = this.selectedFlight.price * this.passenger.length;
  }

  popPassengers(){
    this.passenger.pop({passengerName:'',passengerEmail:'',passengerAge:'',passengerContact:'',passengerPreferences:''});
    this.priceStr = this.selectedFlight.price * this.passenger.length;
  }

  SavePassenger(passenger:any)
  {

    if(this.checkPassengers()){
      return
    }
    else
    {
      alert("Saved passenger details")
      this.bookingService.savePassenger(passenger);
      // .subscribe( 
      //    (data:any)=>
      //  {
      //   data = this.passenger;
      //   console.log("Successfully saved passenger->"+ JSON.stringify(data))
      // });
      }
  }

  // deletePassenger(passengerId:number)
  // {
  //   confirm("Are you sure to Delete this passenger?")
  //   console.log("delete the Passenger with id "+passengerId);
  //   this.bookingService.deletePassengerWithId(passengerId);
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

  //Discount and Pricing 
  fetchDiscounts(){
    this.flightservice.getDiscounts().subscribe(
      (data) =>{
        console.log("Fetching all Discounts from service" + JSON.stringify(data));
        this.resultDiscounts = data;
      }
    )
  }

  calculateDiscount(){
    const FinalPrice = this.priceStr - (this.discountStr/100 * this.priceStr);
    console.log(FinalPrice)
    this.discountedpriceStr = FinalPrice;
    console.log(this.discountStr)
  }

  //Booking
  finishandSave(){
    console.log("Ticket Booked");
    alert("Ticket booked successfully with PNR" + this.pnrGenerator(7) )
    this.ticketGen = "Ticket booked successfully with PNR " + this.pnrGenerator(7)
    
    this.PNRnumber = this.pnrGenerator(7);

    this.booking = {passenger:this.passenger , pnr_number:this.PNRnumber,
      startDate: this.resultFlight.startDate , endDate : this.resultFlight.endDate, 
      bookingDate: new Date(), journey: this.selectedFlight.journey, 
     destination : this.selectedFlight.destination, totalprice: this.discountedpriceStr}

    this.bookingService.saveBooking(this.booking).subscribe(
      (data)=>{
        console.log(JSON.stringify(data));
        this.booking = data;
      }
    )
  }

  pnrGenerator(length: number) {
    let chars = 'ABCDabcd0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
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
