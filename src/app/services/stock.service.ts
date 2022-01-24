import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  companyUrl:string = "http://localhost:9053/api";
  stockUrl:string = "http://localhost:9051/api";

  
  stock:any = [];
  company:any = [];
  
  constructor(private httpClient:HttpClient) {
      
    }

 //company Operations 
    savecompany(company:any)
    {
      console.log("Saving the company to DB "+ JSON.stringify(company))
      return this.httpClient.post(this.companyUrl+'/company/register',company);
      
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
       return this.httpClient.get(this.stockUrl+'/getStocks')
    }
    
    getFilteredstocks(from:Date, to:Date)
    { 
      console.log("getting stocks from "+from+" to" + to);
       return this.httpClient.get(this.stockUrl+'/stock/search/'+from+"/"+to);
    }

    savestock(stock:any){
      console.log("Saved the stock ->"+this.stock);
      return this.httpClient.post(this.stockUrl+"/stock/register",stock);

   }
  
   deletestock(id:number):any{
    this.httpClient.delete(this.stockUrl+'/stock/delete/'+id).
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
