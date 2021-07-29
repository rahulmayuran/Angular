import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  flightUrl:string = "http://ec2-3-22-99-145.us-east-2.compute.amazonaws.com:9051/flight/api/v1.0/flight";

  passenger:any = [];
  booking:any=[];
  passengerList:any =[];

  constructor(private httpClient:HttpClient) { 

  }

  savePassenger(passenger:any)
  {
    console.log("Saved the passenger "+ JSON.stringify(passenger))
    return this.passengerList.push(passenger);
    // return this.httpClient.post(this.flightUrl+'',passenger);
    
  }

  // getPassengers()
  // {
  //   console.log("Fetched all passengers from DB")
  //   return this.httpClient.get(this.flightUrl+'/passengers');
    
  // }
  
  // deletePassengerWithId(id:number):any
  // {
  //   return this.httpClient.delete(this.flightUrl+"/passenger/delete/"+id)
  //   .subscribe(data => {
  //       console.log("Delete Passenger -> "+data);
  //       console.log("Deleted passenger -> "+ JSON.stringify(data));
  //      });
  // }

  saveBooking(booking:any)
  {
   
    // this.booking = {passenger:this.passengerList}
    console.log("Saved the booking "+ JSON.stringify(booking))
    return this.httpClient.post(this.flightUrl+'/booking/register',booking);
    
  }

  getAllTickets()
  {
    console.log("Ticket booking history for user")
    return this.httpClient.get(this.flightUrl+'/bookings');
    
  }
  
  deleteTicketWithId(id:number):any
  {
    return this.httpClient.delete(this.flightUrl+"/booking/delete/"+id)
    .subscribe(data => {
        console.log("Delete Ticket data -> "+data);
        console.log("Deleted Ticket -> "+ JSON.stringify(data));
       });
  }
}
