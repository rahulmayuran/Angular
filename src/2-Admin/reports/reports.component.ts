import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/3-Services/booking.service';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  message:any;
  constructor(private reportService:FlightService) { }

  ngOnInit(): void {
    this.getTicketByid();
  }

  getTicketByid()
  {
    this.reportService.getLatestTicket().subscribe(
      (data:any) => {
        this.message = data;
        console.log("Kafka Reports "+ JSON.stringify(data));
      }
    )
  }
}
