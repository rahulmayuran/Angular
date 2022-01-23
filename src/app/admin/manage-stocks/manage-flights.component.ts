import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css']
})
export class ManageFlightsComponent {

  flights:any=[];
  manageFlightsForm:FormGroup

  constructor(private flightRouter :Router,public service : StockService) {

    this.manageFlightsForm = new FormGroup({

    })
   }

  //  getFlights()
  //  {
  //   this.service.getFlights().subscribe(data=>
  //     {
  //     this.flights=data;
  //     console.log(this.flights);
  //     });
  // }

  // addAirline(){
  //   this.flightRouter.navigateByUrl("/addAirline");
  // }

  // deleteAirline(flight:any){
  //   console.log('deleting '+flight.id);
  //    this.service.deleteFlight(flight.id);
  // }


// showBasicDialog2()
//  {​​​​​
//   this.displayBasic2 = true;
// }​​​​​
    

// // displayBasic2 : boolean
    


}
