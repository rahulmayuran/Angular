import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  message:any =[];
  resultcompany:any = [];
  PNR:any;
  constructor(private reportService:StockService,private stockRouter:Router,) { }

  ngOnInit(): void {
    this.getTicketByid();
  }

  back(){
    this.stockRouter.navigateByUrl("/admin")
  }

  getTicketByid()
  {
    this.reportService.getStocksByAggregation().subscribe(
      (data:any) => {
        this.message = data;

        console.log("Kafka Reports "+ data);
        console.log("PNR number "+ data[0] + data[0].journey + data[0].startDate);
      }
    )
  }
}
