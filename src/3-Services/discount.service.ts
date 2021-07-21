import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  url:string = "http://localhost:9051/admin/api/v1.0/admin"
  discount:any = [];

  constructor(private httpClient:HttpClient) 
  {
    
   }

   saveDiscounts(){
    console.log("Saved the Discount ->"+this.discount);
    return this.httpClient.post(this.url, this.discount);
   }
   
}
