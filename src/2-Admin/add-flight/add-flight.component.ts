import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls:['./add-flight.component.css']
})

export class AddFlightComponent{

  flight:any = [];
  message:string=''
  flightForm:FormGroup;

  constructor(private flightRouter:Router, private fservice:FlightService) 
  { 
    this.flightForm = new FormGroup({
      AirlineName : new FormControl("",Validators.required),
      model : new FormControl("",Validators.required),
      contact : new FormControl("",Validators.required),
      logo : new FormControl("", Validators.required),
      address : new FormControl("", Validators.required)
    })
  }

  
  PersistAirline()
  {
    console.log("Flight Object contains -> "+ this.flight)
    if(this.checkFlight())
    return;
    this.fservice.getFlightByName(this.flight.name).subscribe(
      (data)=>{
      if(data!=0)
      {
        console.log("Data fetched from Mysql DB -> "+ JSON.stringify(data));
      }
      else
      {
        this.fservice.saveFlight(this.flight);
        //this.flightRouter.navigateByUrl('/manageFlights');
      }
   
  });
}
    addAirline(){
      this.flight.push({Airline:'',model:'',contact:'',logo:'',address:''});
    }

    popAirline(){
      this.flight.pop({Airline:'',model:'',contact:'',logo:'',address:''});
    }

  checkFlight():boolean
  {
    if(this.flight.addAirline =='' || this.flight.contact==''
        || this.flight.model=='')
        {
     this.message = "Kindly fill all the details"
      return true;
    }
    return false;
  }

}
  
