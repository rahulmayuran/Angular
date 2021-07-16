import { Component} from '@angular/core';
import { UserService } from 'src/3-Services/user.service';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css'],
  providers:[UserService]
})
export class ManageBookingsComponent {

  result:any = {};
  
  constructor(private userService:UserService) {
   }

   FetchAllUsers(){
    console.log("Sending ajax request");
    
    this.userService.getUsers().subscribe( (res:any)=>{
        console.log(res)
        this.result = res;
      })
}

FetchSingleUser()
  {
    console.log("Sending ajax request");
    
    this.userService.getUserById(1).subscribe((res:any)=>{
        console.log(res)
        this.result = res;
      })
  }



 

}
