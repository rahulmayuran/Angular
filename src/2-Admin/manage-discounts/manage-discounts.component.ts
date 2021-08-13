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
    this.fetchDiscounts()
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

  checkDiscount():boolean
  {
    if(this.discountForm.value.discountName=='')
    {
      this.message = "DiscountName not provided"
      return true;
    }
    else if(this.discountForm.value.discountValue =='')
    {
     this.message = "DiscountValue not provided"
     return true;
    }
    else if(this.discountForm.value.status =='')
    {
     this.message = "Status not provided"
     return true;
    }
    else
    {
      return false;
    }
  }

  PersistDiscount(discounts:any)
  {
    if(this.checkDiscount())
      return;
    
    else 
    {
      console.log("Discounts this.Object contains -> "+ JSON.stringify(this.discounts))
      console.log("Discounts Object contains -> "+ JSON.stringify(discounts))

      this.discountService.saveDiscount(discounts).subscribe( 
         (data:any)=>
       {
         if(this.discountForm.value.discountName === data.discountName
          && this.discountForm.value.discountValue === data.discountValue)
          {
            alert(this.discountForm.value.discountName +' Already Exists');
         }
         else
         {
          data = this.discounts;
          alert('Discount Saved')
          console.log("Successfully saved Discount->"+ JSON.stringify(data))
          this.message = "Saved the Discount -> "+ this.discountForm.value.discountName; 
         }
       
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

  updateDiscount(discountId:number)
  {
    console.log("Push operation with data");
    
    this.discountService.getDiscountById(discountId).subscribe((data:any)=>
    {
      console.log("Discount with id "+ JSON.stringify(data) )
      data.forEach( (d:any) => {
        console.log("Inside foreach "+ JSON.stringify(d.discountId) );
        

        if(discountId == d.discountId)
        {
          console.log("Discount name checker "+ JSON.stringify(d) );
          this.discountForm.value.discountName = d.discountName;
          this.discountForm.value.discountValue = d.discountValue;
          this.discountForm.value.status = d.status;

          this.discounts.push({discountName:d.discountName,discountValue:d.discountValue,status:d.status});
         
        }
      });
      
    });
    this.popDiscount();
    
  }

  updateDiscountById(discountId:number, discounts:any)
  {
    console.log("Updating the discount with id "+ this.resultDiscount.discountId);
    confirm("Are you sure you want to update " + this.resultDiscount.discountName)

     this.discountService.updateDiscount(this.resultDiscount.discountId,discounts);
     alert("Updated succesfully")
    
  }
  deleteDiscount(discountId:number)
  {
    console.log("delete the Discount with id "+discountId);
    confirm("Are you sure , you want to delete this Discount?");
    this.discountService.deleteDiscount(discountId);
  }

  

}
