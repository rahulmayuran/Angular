import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  sName: any;

  resultstock: any = [];
  message: string = '';
  dateForm: FormGroup;

  resultStock: any = { startDate: '', endDate: '' };
  filteredStocks: any = [];
  companyStocks: any = [];
  aggregatedStocks: any = [];

  ngOnInit(): void {
    let sName = sessionStorage.getItem('uName')
    this.sName = sName;
  }

  constructor(private adminRouter: Router, private stockService: StockService) {
    this.dateForm = new FormGroup({
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required)
    })
  }

  Users() {
    this.adminRouter.navigateByUrl('user-list')
  }
  companyStock() {
    this.adminRouter.navigateByUrl('company_stock');
  }
  reports() {
    this.adminRouter.navigateByUrl('report');
  }

  checkDates(): boolean {
    if (this.dateForm.value.startDate == '' || this.dateForm.value.endDate == '') {
      return true
    }
    return false;
  }

  fetchstocks() {
    console.log("Fetching All stocks")
    this.stockService.getstocks()
      .subscribe((data: any) => {
        const list = data.length;
        console.log("List of stocks is " + list)

        data.forEach((s: any) => {
          console.log("Min stock price is " + Math.min(s.stockPrice) + " -Max price is- " + Math.max(s.stockPrice) + " with company " + s.companyName);
        });

        // console.log("Fetched stocks from MongoDB ->"+ JSON.stringify(data))
        this.resultstock = data;
      },
        (err: any) => {
          this.message = "Failed to Fetch data"
        })
  }

  fetchStocksBasedOnPrices() {
    this.stockService.getStocksByPrice().subscribe(stocks => {
      this.companyStocks = stocks;
      console.log("Stock details based on price " + JSON.stringify(stocks))
    })
  }

  fetchStocksByAggregation() {
    this.stockService.getStocksByAggregation().subscribe(aggregate => {
      this.aggregatedStocks = aggregate;
      console.log("Stock details based on Aggregation " + JSON.stringify(aggregate))

    })
  }

  filterStocks(from: Date, to: Date) {
    from = this.dateForm.value.startDate;
    to = this.dateForm.value.endDate;

    if (this.checkDates()) {
      alert("Kindly provide both dates")
    }

    console.log("Start date is " + from + " End date is " + to);

    this.stockService.getFilteredstocks(from, to)
      .subscribe((data: any) => {
        this.filteredStocks = data;
        console.log("Filtered Stocks- " + data);
        this.message = data.length + " stock(s) found";
      },
        (err: any) => {
          alert("Kindly provide both dates")
          this.reset();
        })

  }

  reset() {
    this.message = "";
  }
}
