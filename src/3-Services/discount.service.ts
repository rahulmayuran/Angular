import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  url:string = "http://localhost:3000/discounts";
  discount:any = [];

  constructor(private httpClient:HttpClient) 
  {
    
   }

   saveDiscounts(){
    console.log("Saved the Discount ->"+this.discount);
    return this.httpClient.post(this.url, this.discount);
   }
   
}
