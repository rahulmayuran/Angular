import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  flightUrl:string = "http://localhost:9051/admin/api/v1.0/flight";

  passenger:any = [];

  constructor(private httpClient:HttpClient) { 

  }

  savePassenger(passenger:any)
  {
    console.log("Saved the passenger "+ JSON.stringify(passenger))
    return this.httpClient.post(this.flightUrl+'/passenger/register',passenger);
    
  }

  getPassengers()
  {
    console.log("Fetched all passengers from DB")
    return this.httpClient.get(this.flightUrl+'/passengers');
    
  }
  
  deletePassengerWithId(id:number):any
  {
    return this.httpClient.delete(this.flightUrl+"/passenger/delete/"+id)
    .subscribe(data => {
        console.log("Delete Passenger -> "+data);
        console.log("Deleted passenger -> "+ JSON.stringify(data));
       });
  }
}
