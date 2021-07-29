import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/3-Services/booking.service';
import { UserService } from 'src/3-Services/user.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent {

  
  bookingResults:any = [];
  userfromService:any;
  viewmsg:any;
  
  constructor(private router:Router, private bookService:BookingService
    ,private userService:UserService) {

      this.userfromService = this.userService.serviceuname;
   }

   back(){
     this.router.navigateByUrl("/user");
   }

   loadUser(){
    this.userfromService = this.userService.serviceuname;
    this.bookingResults.uname = this.userService.serviceuname;
   }

   fetchBookings(){
     console.log("Fetching from DB ")
     this.bookService.getAllTickets().subscribe(
       (data)=>{
         console.log(data);
         this.bookingResults = data;
       }
     )
   }

   ViewTicket(f:any){
    console.log("Ticket Information")
    console.log(JSON.stringify(this.bookingResults));
    console.log(this.userService.serviceuname);
    this.viewmsg = JSON.stringify(this.bookingResults);
   }

   DownloadTicket(f:any)
   {
    console.log("Downloading ticket....")
    console.log("booking result obj "+JSON.stringify(f))
    let ticketpdf = new jsPDF('l','pt','a4');

    var item = this.bookingResults;
    var passengerList:any = item.passenger?.passengerName;

    // the text is 30 from left and 30 from top
    ticketpdf.text('Flight Booking Application', 30,30);

    const cols = [' PNR Number ', ' Start Date ', 
    ' Total Price  ','  Booking Date ', ' Journey ',' Destination '];

    const rows:any= [];
    const prows:any = [];

    item.forEach( (element:any) => 
    {
      const temp = [element.pnr_number,
        element.startDate, element.totalprice, 
        element.bookingDate, element.journey, element.destination];
      rows.push(temp);
    });

    ticketpdf.text('Columns -> '+cols, 30, 90);
    ticketpdf.text('Values -> '+rows, 1, 150);
    ticketpdf.save("FlightTicket.pdf");
  }
 
   CancelTicket(id:number)
   {
     confirm("You just now booked! Are you sure to cancel it?")
     console.log("Deleting Ticket");
     this.bookService.deleteTicketWithId(id);
   }

 

}
