import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';

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
  resultcompany:any = [];
  stock:any=[];
  resultstock:any = [];
  
  companyFrom:FormGroup;
  stockForm:FormGroup;

  constructor(private stockRouter:Router, private stockService:StockService) 
  { 
    this.companyFrom = new FormGroup(
      {
      companyName : new FormControl("",Validators.required),
      companyCEO : new FormControl("",Validators.required),
      companyWebsite : new FormControl("",Validators.required),
      companyTurnover : new FormControl("", Validators.required),
      exchangeType : new FormControl("", Validators.required)

    })

    this.stockForm = new FormGroup({
      stockPrice: new FormControl("",Validators.required),
    })
  }

  back(){
    this.stockRouter.navigateByUrl("/admin")
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
       if(this.companyFrom.value.exchangeType == 'NSE')
       {
        company.isNSE = true; 
        company.isBSE = false;
       }
       else{
        company.isNSE = false; 
        company.isBSE = true;
       }

      this.stockService.savecompany(company)
        .subscribe(  (data:any)=>
        {
          data = this.company;
          alert("Company "+company.companyName+" saved");
          console.log("Successfully saved company ->"+ JSON.stringify(data))
        })
      }
    }

  fetchcompanies(){
    console.log("Fetching All companys")
    this.stockService.getcompanies().subscribe(
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
     const promptValue = confirm("Are you sure to delete this company? Action can't be undone");

    if(promptValue)
    {
      this.stockService.deletecompanyWithId(companyId);
    }
    else
    {
      this.stockService.deletecompanyWithId(1/0);
    }
   
  }

    addcompany()
    {
      this.company.push({
        companyName:'',
        companyCEO:'',
        companyWebsite:'',
        companyTurnover:'',
        exchangeType:''
      });
    }

    popcompany(){
      this.company.pop({
        companyName:'',
        companyCEO:'',
        companyWebsite:'',
        companyTurnover:'',
        exchangeType:''
      });
    }

  checkcompany():boolean
  {
    if(this.company.companyName =='' || this.company.companyWebsite==''
        || this.company.companyCEO=='' || this.company.exchangeType=='')
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }

  //stock Operations 
  addstock(company:any)
  {
    this.stock.push({stockPrice:'',company:company});
  }

  popstock(){
    this.stock.pop({stockPrice:'',company:''});
  }

  Persiststock(stock:any)
  {
    console.log("stock this.Object contains -> "+ JSON.stringify(this.stock))
    console.log("stock Object contains -> "+ JSON.stringify(stock))

    if( this.checkstock() ){
      return;
    }
    else
    {
      console.log("Form company name - "+ stock.company.companyName)
      stock.companyName = stock.company.companyName;

      alert('stock Saved for '+stock.company.companyName)
      this.stockService.savestock(stock)
        .subscribe(  (data:any)=>
        {
          data = this.stock;
          console.log("Successfully saved stock with model ->"+ JSON.stringify(data))
        })
      }
    }

    fetchstocks(){
      console.log("Fetching All stocks")
      this.stockService.getstocks().subscribe(
        (data:any)=>{
          console.log("Fetched stocks from DB ->"+ JSON.stringify(data))
          this.resultstock = data;
        }, (err:any)=>{
          this.message = "Failed to Fetch data"
        }
      )
    }

  deletestock(stockId:number)
    {
      console.log("delete the stock with id "+stockId);
      confirm("Delete this stock ?");
      this.stockService.deletestock(stockId);
    }

    checkstock():boolean
  {
    if(this.stock.price =='' || this.stock.noOfSeats==''
        || this.stock.journey=='' || this.stock.destination)
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }
}
  
