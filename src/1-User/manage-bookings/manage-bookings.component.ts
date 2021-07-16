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

// FetchSingleUser(id:number)
//   {
//     console.log("Sending ajax request");
    
//     this.userService.getUserById(id).subscribe((res:any)=>{
//         console.log(res)
//       })
//   }

//   SaveUser(user:any)
// {
//   console.log("Sending ajax request");
  
//   this.userService.saveUser(user).subscribe( (res:any)=>{
//       console.log(res)
//     })
// }

 

}
