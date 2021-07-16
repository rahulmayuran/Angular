import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flightUrl:string = "http://localhost:3000/flights";
  flight:any = [];
  
  constructor(private httpClient:HttpClient) {

    }

    saveFlight(flight:any){
      console.log("Saved the flight ->"+this.flight);
      return this.httpClient.post(this.flightUrl, flight);

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
