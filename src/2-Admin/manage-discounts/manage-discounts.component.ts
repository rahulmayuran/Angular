import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.css']
})
export class ManageDiscountsComponent implements OnInit {

  discounts:any=[];
  message:string=''
  discountForm:FormGroup;
  resultDiscount:any = [];

  constructor(private discountRouter:Router, public discountService:FlightService)
   {
    this.discountForm = new FormGroup(
      {
        discountId : new FormControl("", Validators.required),
        discountName : new FormControl("",Validators.required),
        discountValue : new FormControl("",Validators.required),
        status : new FormControl("",Validators.required)
    })
   }

  ngOnInit(): void {
  }

  back(){
    this.discountRouter.navigateByUrl("/admin")
  }

  addDiscount(){
    this.discounts.push({discountName:'',discountValue:'',status:''});
  }
  
  popDiscount(){
    this.discounts.pop({discountName:'',discountValue:'',status:''});
  }

  PersistDiscount(discounts:any)
  {
    console.log("Discounts this.Object contains -> "+ JSON.stringify(this.discounts))
    console.log("Discounts Object contains -> "+ JSON.stringify(discounts))

    if( this.checkDiscount())
    {
      return;
    }
    else
    {
      alert('Discount Saved')
      this.discountService.saveDiscount(discounts).subscribe( 
         (data:any)=>
       {
        data = this.discounts;
        console.log("Successfully saved Discount->"+ JSON.stringify(data))
      });
      }
    }

  fetchDiscounts(){
    console.log("Fetching All Discounts")
    this.discountService.getDiscounts().subscribe(
      (data:any)=>{
        console.log("Fetched Discounts from MySQL ->"+ JSON.stringify(data))
        this.resultDiscount = data;
      },(err:any)=>
      {
        this.message = "Failed to Fetch data"
      }
    )
  }

  deleteDiscount(discountId:number)
  {
    console.log("delete the Discount with id "+discountId);
    confirm("Are you sure , you want to delete this Discount?");
    this.discountService.deleteDiscount(discountId);
  }

  checkDiscount():boolean
  {
    if(this.discounts.discountName == '' || this.discounts.discountValue==''
        || this.discounts.status=='')
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }

}
