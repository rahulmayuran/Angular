import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  message: any = [];

  constructor(private reportService: StockService, private stockRouter: Router,) { }

  ngOnInit() {
    this.getStocksFromAggregation()
  }

  getStocksFromAggregation() {
    this.reportService.getStocksByAggregation().subscribe(
      (data: any) => {
        this.message = data;
      }
    )
  }
}
