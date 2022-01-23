import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StockService } from '../services/stock.service';

@Component({
  // selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit
{
  User:string='Admin';
  journey: NgbDateStruct|undefined;
  return: NgbDateStruct|undefined;

  resultstock:any = [];
  message:string='';
  dateForm:FormGroup;

  resultStock:any = {startDate:'',endDate:''};


ngOnInit()
{
  this.fetchstocks()
}

  constructor(private adminRouter:Router, private stockService:StockService) 
  {
    this.dateForm = new FormGroup({
      startDate : new FormControl("",Validators.required),
      endDate : new FormControl("",Validators.required)
    })
   }


   navigateToList(){
    this.adminRouter.navigateByUrl('flightList');
   }
   searchFlights(){
    this.adminRouter.navigateByUrl('search');
   }
   manageBookings(){
    this.adminRouter.navigateByUrl('manage');
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
    reports(){
      this.adminRouter.navigateByUrl('report');
    }

    fetchstocks(){
      console.log("Fetching All stocks")
      this.stockService.getstocks().subscribe(
        (data:any)=>{
          console.log("Fetched stocks from MongoDB ->"+ JSON.stringify(data))
          this.resultstock = data;
        }, (err:any)=>{
          this.message = "Failed to Fetch data"
        })
    }

    filterStocks(startDate:string, endDate:string){
      this.stockService.getFilteredstocks(startDate,endDate).subscribe(
        (data:any) => {
          JSON.stringify("Filtered Stocks- "+data);
        })
    }
}
