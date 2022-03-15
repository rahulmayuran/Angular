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
  resultcompany: any = [];
  PNR: any;
  constructor(private reportService: StockService, private stockRouter: Router,) { }

  ngOnInit() {
  }

  back() {
    this.stockRouter.navigateByUrl("/admin")
  }

}
