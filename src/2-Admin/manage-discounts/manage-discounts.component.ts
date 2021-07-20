import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.css']
})
export class ManageDiscountsComponent implements OnInit {

  discounts:any=[];
  resultant:any;

  constructor(private discountRouter:Router, public discountService:FlightService) {

   }

  ngOnInit(): void {
  }

  addDiscount(){
    this.discounts.push({id:'',code:'',discount:''});
  }
  
  popDiscount(){
    this.discounts.pop({id:'',code:'',discount:''});
  }

  saveDiscount(discount:any){
    this.discountService.PersistDiscount(discount)
      .subscribe((res) => {
        console.log("Res is "+res);
        console.log("Resultant is"+this.resultant);
        res = this.resultant
      });
  }

}
