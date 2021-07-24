import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  adminUrl:string = "http://localhost:9051/admin/api/v1.0/admin"
  discount:any = [];

  constructor(private httpClient:HttpClient) 
  {
    
   }
  
   saveDiscount(discount:any){
    console.log('Saving...'+discount);
    if(discount.id<1)
      this.httpClient.post(this.adminUrl+'discounts',discount).subscribe(disc => {
      console.log(disc);
      });
      else{
        this.httpClient.put(this.adminUrl+'discounts/'+discount.id,discount).subscribe(disc => {
          console.log(disc);
      });
    }
  }

  getDiscounts(query:string): Observable<any>{
    return  this.httpClient.get(this.adminUrl+'discounts'+query);
   }

   deleteDiscount(discount:any){
      return this.httpClient.delete(this.adminUrl+'/delete/discount',discount);
   }
   
}
