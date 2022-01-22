import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  companyUrl:string = "http://localhost:9053/api";
  
  stock:any = [];
  company:any = [];
  
  constructor(private httpClient:HttpClient) {
      
    }

 //company Operations 
    savecompany(company:any)
    {
      console.log("Saved the company "+ JSON.stringify(company))
      return this.httpClient.post(this.companyUrl+'/register',company);
      
    }

    getcompanies()
    {
      console.log("Fetched all companies ")
      return this.httpClient.get(this.companyUrl+'/getCompanies');
      
    }
    
    deletecompanyWithId(id:number):any
    {
      return this.httpClient.delete(this.companyUrl+"/company/delete/"+id)
      .subscribe(data => {
          console.log("Angular Service -> "+data);
          console.log("Angular Service stringified-> "+ JSON.stringify(data));
    });
    }

//stock Operations
    getstocks()
    { 
      console.log("getting all the stocks")
       return this.httpClient.get(this.companyUrl+'/getStocks')
    }
    
    getFilteredstocks(from:string, to:string)
    { 
      console.log("getting stocks from "+from+" to" + to);
       return this.httpClient.get(this.companyUrl+'/stock/search/'+from+"/"+to);
    }

    savestock(stock:any){
      console.log("Saved the stock ->"+this.stock);
      return this.httpClient.post(this.companyUrl+"/stock/register",stock);

   }
  
   deletestock(id:number):any{
    this.httpClient.delete(this.companyUrl+'/stock/delete/'+id).
    subscribe(data => {
      console.log(data);
    });
  }

    getStockByName(name:string){
      console.log("got the stock name->"+name);
      return this.httpClient.get(this.companyUrl+'/'+name);
   }

  //Kafka operations
  getLatestTicket()
  {
    console.log("Generating Kafka reports ->");
    return this.httpClient.get(this.companyUrl+"/kafka/reports");
    
  }
}
