import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/3-Services/user.service';
import { LoginComponent } from 'src/6-Other-Components/login/login.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'], 
})
export class UserComponent
{
  User:string='User';
  journey: NgbDateStruct|undefined;
  return: NgbDateStruct|undefined;

  constructor(private router:Router,service:UserService) {
    service.getUsers();
   }
   
  navigateToList(){
    this.router.navigateByUrl('flightList');
   }
   searchFlights(){
    this.router.navigateByUrl('search');
   }
   manageBookings(){
    this.router.navigateByUrl('manage');
   }
   logout(){
     this.router.navigateByUrl('logout');
   }

 
}
