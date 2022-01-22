import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls:['./add-stock.component.css']
})

export class AddStockComponent implements OnInit{

  ngOnInit(){

  }
  
  company:any = [];
  message:string=''
  companyFrom:FormGroup;
  resultcompany:any = [];

  stock:any=[];
  resultstock:any = [];
  stockForm:FormGroup;

  constructor(private stockRouter:Router, private stockService:StockService) 
  { 
    this.companyFrom = new FormGroup(
      {
      companyId : new FormControl("", Validators.required),
      companyName : new FormControl("",Validators.required),
      companyModel : new FormControl("",Validators.required),
      companyLogo : new FormControl("",Validators.required),
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

  //company Operations 
  Persistcompany(company:any)
  {
    console.log("company this.Object contains -> "+ JSON.stringify(this.company))
    console.log("company Object contains -> "+ JSON.stringify(company))

    if( this.checkcompany() ){
      return;
    }
    else
    {
      this.fservice.savecompany(company)
        .subscribe(  (data:any)=>
        {
          data = this.company;
          console.log("Successfully saved company ->"+ JSON.stringify(data))
        })
      }
    }

  fetchcompanies(){
    console.log("Fetching All companys")
    this.fservice.getcompanies().subscribe(
      (data:any)=>{
        console.log("Fetched companies from MongoDB ->"+ JSON.stringify(data))
        this.resultcompany = data;
      }, (err:any)=>{
        this.message = "Failed to Fetch data"
      }
    )
  }

  deletecompany(companyId:number)
  {
    console.log("delete the company with id "+companyId);
    confirm("Are you sure to delete this company?");
    this.fservice.deletecompanyWithId(companyId);
  }

    addcompany()
    {
      this.company.push({companyName:'',companyModel:'',companyLogo:'',contactNumber:''});
    }

    popcompany(){
      this.company.pop({companyName:'',companyModel:'',companyLogo:'',contactNumber:''});
    }

  checkcompany():boolean
  {
    if(this.company.companyName =='' || this.company.companyModel==''
        || this.company.contactNumber=='')
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }

  //Flight Operations 
  addFlight(company:any)
  {
    this.flight.push({noOfSeats:'',price:'',journey:'',destination:'',startDate:'',endDate:'',company:company});
  }

  popFlight(){
    this.flight.pop({noOfSeats:'',price:'',journey:'',destination:'',startDate:'',endDate:'',company:""});
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
      console.log("delete the company with id "+flightId);
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
  
