import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls:['./add-flight.component.css']
})

export class AddFlightComponent implements OnInit{

  ngOnInit(){

  }
  
  airline:any = [];
  message:string=''
  airlineForm:FormGroup;
  resultAirline:any = [];

  flight:any=[];
  resultFlight:any = [];
  flightForm:FormGroup;

  constructor(private flightRouter:Router, private fservice:FlightService) 
  { 
    this.airlineForm = new FormGroup(
      {
      airlineId : new FormControl("", Validators.required),
      airlineName : new FormControl("",Validators.required),
      airlineModel : new FormControl("",Validators.required),
      airlineLogo : new FormControl("",Validators.required),
      contactNumber : new FormControl("", Validators.required)
    })

    this.flightForm = new FormGroup({
      noOfSeats: new FormControl("",Validators.required),
      price: new FormControl("",Validators.required),
      journey: new FormControl("",Validators.required),
      destination : new FormControl("",Validators.required),
      startDate : new FormControl("",Validators.required),
      endDate : new FormControl("",Validators.required)
    })
  }

  back(){
    this.flightRouter.navigateByUrl("/admin")
  }

  //Airline Operations 
  PersistAirline(airline:any)
  {
    console.log("Airline this.Object contains -> "+ JSON.stringify(this.airline))
    console.log("Airline Object contains -> "+ JSON.stringify(airline))

    if( this.checkAirline() ){
      return;
    }
    else
    {
      this.fservice.saveAirline(airline)
        .subscribe(  (data:any)=>
        {
          data = this.airline;
          console.log("Successfully saved Airline ->"+ JSON.stringify(data))
        })
      }
    }

  fetchAirlines(){
    console.log("Fetching All Airlines")
    this.fservice.getAirlines().subscribe(
      (data:any)=>{
        console.log("Fetched Airlines from MySQL ->"+ JSON.stringify(data))
        this.resultAirline = data;
      }, (err:any)=>{
        this.message = "Failed to Fetch data"
      }
    )
  }

  deleteAirline(airlineId:number)
  {
    console.log("delete the Airline with id "+airlineId);
    confirm("Are you sure to delete this Airline?");
    this.fservice.deleteAirlineWithId(airlineId);
  }

    addAirline()
    {
      this.airline.push({airlineName:'',airlineModel:'',airlineLogo:'',contactNumber:''});
    }

    popAirline(){
      this.airline.pop({airlineName:'',airlineModel:'',airlineLogo:'',contactNumber:''});
    }

  checkAirline():boolean
  {
    if(this.airline.airlineName =='' || this.airline.airlineModel==''
        || this.airline.contactNumber=='')
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }

  //Flight Operations 
  addFlight(airline:any)
  {
    this.flight.push({noOfSeats:'',price:'',journey:'',destination:'',startDate:'',endDate:'',airline:airline});
  }

  popFlight(){
    this.flight.pop({noOfSeats:'',price:'',journey:'',destination:'',startDate:'',endDate:'',airline:""});
  }

  PersistFlight(flight:any)
  {
    console.log("Flight this.Object contains -> "+ JSON.stringify(this.flight))
    console.log("Flight Object contains -> "+ JSON.stringify(flight))

    if( this.checkFlight() ){
      return;
    }
    else
    {
      alert('Flight Saved')
      this.fservice.saveFlight(flight)
        .subscribe(  (data:any)=>
        {
          data = this.flight;
          console.log("Successfully saved flight with model ->"+ JSON.stringify(data))
        })
      }
    }

    fetchFlights(){
      console.log("Fetching All Flights")
      this.fservice.getFlights().subscribe(
        (data:any)=>{
          console.log("Fetched Flights from MySQL ->"+ JSON.stringify(data))
          this.resultFlight = data;
        }, (err:any)=>{
          this.message = "Failed to Fetch data"
        }
      )
    }

  deleteFlight(flightId:number)
    {
      console.log("delete the Airline with id "+flightId);
      confirm("Are you sure , you want to delete this Flight?");
      this.fservice.deleteFlight(flightId);
    }

    checkFlight():boolean
  {
    if(this.flight.price =='' || this.flight.noOfSeats==''
        || this.flight.journey=='' || this.flight.destination)
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }
}
  
