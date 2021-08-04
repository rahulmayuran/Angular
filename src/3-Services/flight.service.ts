import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  // flightUrl:string = "http://localhost:3000/";
  // flightUrl:string = "http://localhost:9053/api/v1.0/flight";
  // adminUrl:string = "http://ec2-3-22-99-145.us-east-2.compute.amazonaws.com:9051/admin/api/v1.0/admin";
  adminUrl:string = "http://localhost:9051/admin/api/v1.0/admin";
  
  flight:any = [];
  airline:any = [];
  discount:any = [];

  scheduledResultFlight:any ;
  
  constructor(private httpClient:HttpClient) {
      
    }

 //Airline Operations 
    saveAirline(airline:any)
    {
      console.log("Saved the airline "+ JSON.stringify(airline))
      return this.httpClient.post(this.adminUrl+'/airline/register',airline);
      
    }

    getAirlines()
    {
      console.log("Fetched all airlines ")
      return this.httpClient.get(this.adminUrl+'/airline');
      
    }
    
    deleteAirlineWithId(id:number):any
    {
      return this.httpClient.delete(this.adminUrl+"/airline/delete/"+id)
      .subscribe(data => {
          console.log("Angular Service -> "+data);
          console.log("Angular Service stringified-> "+ JSON.stringify(data));
    });
    }

//Flight Operations
    getFlights()
    { 
      console.log("getting all the flights")
       return this.httpClient.get(this.adminUrl+'/flight/search')
    }
    
    getFilteredFlights(j:string, d:string)
    { 
      console.log("getting flights from "+j+" to" + d);
       return this.httpClient.get(this.adminUrl+'/flight/search/'+j+"/"+d);
    }

    saveFlight(flight:any){
      console.log("Saved the flight ->"+this.flight);
      return this.httpClient.post(this.adminUrl+"/flight/register",flight);

   }
  
   deleteFlight(id:number):any{
    this.httpClient.delete(this.adminUrl+'/flight/delete/'+id).
    subscribe(data => {
      console.log(data);
    });
  }

    getFlightByName(name:string){
      console.log("got the flight name->"+name);
      return this.httpClient.get(this.adminUrl+'/'+name);

   }

   scheduleAFlight(t:Time){
     console.log("Schedule this flight for "+t);
     return this.httpClient.post(this.adminUrl+'/flight/schedule',t);
   }

   //Discount Operations 
   
   getDiscounts(){
    console.log("getting all the discounts from service")
     return this.httpClient.get(this.adminUrl+"/discount/getDiscounts")
   }
   
   saveDiscount(discount:any)
   {
    console.log("Saved the Discount ->"+this.discount);
    return this.httpClient.post(this.adminUrl+"/discount/register",discount);
    }

  getDiscountsByQuery(query:string): Observable<any>{
    return  this.httpClient.get(this.adminUrl+'/discounts'+query);
   }


   deleteDiscount(id:number):any{
    this.httpClient.delete(this.adminUrl+'/discount/deleteDiscount/'+id).
    subscribe(data => {
      console.log(data);
    });
  }

  //Kafka operations
  getLatestTicket()
  {
    console.log("Generating Kafka reports ->");
    return this.httpClient.get(this.adminUrl+"/kafka/reports");
    
  }
}
