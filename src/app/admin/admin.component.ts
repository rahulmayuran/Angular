import { DatePipe } from '@angular/common';
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
  filteredStocks:any = [];
  companyStocks:any = [];
  aggregatedStocks:any = [];



ngOnInit()
{
  // this.fetchstocks()
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
      this.adminRouter.navigateByUrl('company_stock');
    }
    reports(){
      this.adminRouter.navigateByUrl('report');
    }

    fetchstocks(){
      console.log("Fetching All stocks")
      this.stockService.getstocks()
      .subscribe( (data:any)=>
        {
          const list = data.length;
          console.log("List of stocks is "+list)

          data.forEach((s:any) => 
          {
            console.log("Min stock price is "+Math.min(s.stockPrice)+" -Max price is- "+Math.max(s.stockPrice)+" with company "+s.companyName);
          });

          // console.log("Fetched stocks from MongoDB ->"+ JSON.stringify(data))
          this.resultstock = data;
        }, 
        (err:any)=>
        {
          this.message = "Failed to Fetch data"
        })
    }

    fetchStocksBasedOnPrices()
    {
      this.stockService.getStocksByPrice().subscribe(stocks=>{
        this.companyStocks = stocks;
        console.log("Stock details based on price "+JSON.stringify(stocks))
      })
    }

    fetchStocksByAggregation(){
      this.stockService.getStocksByAggregation().subscribe(aggregate=>{
        this.aggregatedStocks = aggregate;
        console.log("Stock details based on Aggregation "+JSON.stringify(aggregate))

      })
    }

    filterStocks(from:Date, to:Date)
    {
      from = this.dateForm.value.startDate ;
      to = this.dateForm.value.endDate ;

      if(to == null || to === null){
        alert("Kindly provide both dates")
      }

      console.log("Start date is "+from+" End date is "+to);

      this.stockService.getFilteredstocks(from,to)
        .subscribe( (data:any) => 
        {
          this.filteredStocks = data;
          console.log("Filtered Stocks- "+data);
          this.message = data.length+" stock(s) found";
        }, 
        (err:any)=>
        {
          alert("Kindly provide both dates")
          this.reset();
        })

    }

    reset()
    {
      this.message = "";
    }
}