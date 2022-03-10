import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stock: any = [];
  company: any = [];

  constructor(private httpClient: HttpClient) {

  }

  //company Operations 
  savecompany(company: any) {
    console.log("Saving the company to DB " + JSON.stringify(company))
    return this.httpClient.post(environment.companyUrl + '/company/register', company);

  }

  getcompanies() {
    console.log("Fetched all companies ")
    return this.httpClient.get(environment.companyUrl + '/getCompanies');

  }

  deletecompanyWithId(id: number): any {
    return this.httpClient.delete(environment.companyUrl + "/company/delete/" + id)
      .subscribe(data => {
        console.log("Angular Service -> " + data);
        console.log("Angular Service stringified-> " + JSON.stringify(data));
      });
  }

  //stock Operations
  getstocks() {
    console.log("getting all the stocks")
    return this.httpClient.get(environment.stockUrl + '/getStocks')
  }

  getStocksByPrice() {
    console.log("getting all the stocks")
    return this.httpClient.get(environment.stockUrl + '/getStocks/price')
  }

  getStocksByAggregation() {
    console.log("getting all the stocks")
    return this.httpClient.get(environment.stockUrl + '/getStocks/aggregation')
  }

  getFilteredstocks(from: Date, to: Date) {
    console.log("getting stocks from " + from + " to" + to);
    return this.httpClient.get(environment.stockUrl + '/stock/search/' + from + "/" + to);
  }

  savestock(stock: any) {
    console.log("Saved the stock ->" + this.stock);
    return this.httpClient.post(environment.stockUrl + "/stock/register", stock);

  }

  deletestock(id: number): any {
    this.httpClient.delete(environment.stockUrl + '/stock/delete/' + id).
      subscribe(data => {
        console.log(data);
      });
  }

  //Kafka operations
  getLatestTicket() {
    console.log("Generating Kafka reports ->");
    return this.httpClient.get(environment.companyUrl + "/kafka/reports");

  }
}
