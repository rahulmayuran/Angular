import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  message:any =[];
  PNR:any;
  constructor(private reportService:StockService) { }

  ngOnInit(): void {
    this.getTicketByid();
  }

  getTicketByid()
  {
    this.reportService.getLatestTicket().subscribe(
      (data:any) => {
        this.message = data;

        console.log("Kafka Reports "+ data);
        console.log("PNR number "+ data[0] + data[0].journey + data[0].startDate);
      }
    )
  }
}