import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  // flightUrl:string = "http://localhost:3000/";
  // flightUrl:string = "http://localhost:9053/api/v1.0/flight";
  //flightUrl:string = "http://localhost:9051/flight/api/v1.0/flight";
  adminUrl:string = "http://localhost:9051/admin/api/v1.0/admin";
  flight:any = [];
  airline:any = [];
  discount:any = [];
  
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

   //Discount Operations 
   
   getDiscounts(){
    console.log("getting all the discounts from service")
     return this.httpClient.get(this.adminUrl+"/discount/getDiscounts")
   }
   
   saveDiscount(discount:any)
   {
    console.log("Saved the Discount ->"+this.discount);
    return this.httpClient.post(this.adminUrl+"/discount/register",discount);
    // console.log('Persisted to Table -> ..'+discount);
    // if(discount.id<1)
    //   this.httpClient.post(this.adminUrl+'/discount/register',discount)
    //     .subscribe(disc => 
    //       {
    //          console.log(disc);
    //       });
    //   else
    //   {
    //     this.httpClient.put(this.adminUrl+'/discounts/'+discount.id,discount)
    //     .subscribe(disc => 
    //       {
    //       console.log(disc);
    //       });
    //    }
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

}
