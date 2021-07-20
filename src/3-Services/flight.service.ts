import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/5-Entity/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  // flightUrl:string = "http://localhost:3000/";
  flightUrl:string = "http://localhost:9051/api/v1.0/flight";
  flight:any
  
  constructor(private httpClient:HttpClient) {

    }

    getFlights()
    { 
      console.log("getting all the flights")
       return this.httpClient.get(this.flightUrl+'/flights')
    }

    saveFlight(flight:any){
      console.log("Saved the flight ->"+this.flight);
      return this.httpClient.post(this.flightUrl, flight);

   }

    getFlightByName(name:string){
      console.log("got the flight name->"+name);
      return this.httpClient.get<Flight[]>(this.flightUrl+'flights?name'+name);

   }

   saveDiscount(discount:any){
    console.log('Saving...'+discount);
    if(discount.id<1)
      this.httpClient.post(this.flightUrl+'discounts',discount).subscribe(disc => {
      console.log(disc);
      });
      else{
        this.httpClient.put(this.flightUrl+'discounts/'+discount.id,discount).subscribe(disc => {
          console.log(disc);
      });
    }
  }

  getDiscounts(query:string): Observable<any>{
    return  this.httpClient.get(this.flightUrl+'discounts'+query);
   }

}
