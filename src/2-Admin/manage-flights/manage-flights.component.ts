import { DecimalPipe } from '@angular/common';
import { Component, PipeTransform} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlightService } from 'src/3-Services/flight.service';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css']
})
export class ManageFlightsComponent {

  flights:any=[];
  manageFlightsForm:FormGroup

  constructor(private flightRouter :Router,public service : FlightService) {

    this.manageFlightsForm = new FormGroup({

    })
   }

   getFlights()
   {
    this.service.getFlights().subscribe(data=>
      {
      this.flights=data;
      console.log(this.flights);
      });
  }

  addAirline(){
    this.flightRouter.navigateByUrl("/addAirline");
  }

  deleteAirline(flight:any){
    console.log('deleting '+flight.id);
     this.service.deleteFlight(flight.id);
  }


// showBasicDialog2()
//  {​​​​​
//   this.displayBasic2 = true;
// }​​​​​
    

// // displayBasic2 : boolean
    


}
