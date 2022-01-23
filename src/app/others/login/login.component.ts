import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService]
})

export class LoginComponent{

  loginUserForm:FormGroup;
  user:any=[];
  message:string = '';
  navToRegister:string = 'Register';


  constructor(private router:Router, private userService:UserService)
  {

    this.user= {id:0 ,name:'',password:'',role:''};

    this.loginUserForm = new FormGroup({
      username : new FormControl("", [
            Validators.required,
            Validators.pattern("[a-zA-Z]{1,}") 
      ]),
      password : new FormControl("", [
            Validators.required,
            Validators.minLength(8)
      ])
    })
  }

  validateCred()
  {
    if( this.checkUserForNull() )
      return; 
      // this.router.navigate(['/register']);

    if(this.loginUserForm.value.username == 'admin' && 
    this.loginUserForm.value.password == 'admin')
    {
      this.router.navigateByUrl('admin')
      
    }
    else if(this.loginUserForm.value.username == this.userService
            .getUserByName(this.user.name)
            .subscribe(  
              (data:any)=> {
                      //data is in MySQl
                      console.log("name/password in json "+JSON.stringify(data.role))
          
                        if(data.username  == this.loginUserForm.value.username
                          && data.password == this.loginUserForm.value.password
                          && data.role == "USER")
                        {
                          this.userService.serviceuname = this.loginUserForm.value.username;
                          console.log("Names/passwords matched with form data - USER")
                          this.router.navigateByUrl('user')
                        }
                        else if(data.username  == this.loginUserForm.value.username
                          && data.password == this.loginUserForm.value.password
                          && data.role == "ADMIN")
                          {
                            console.log("Names/passwords matched with form data - ADMIN")
                            this.router.navigateByUrl('admin')
                          }
                     
                     }) //End of Subscription
                    )//End of ElseIf condition
    {
      console.log("Name check done")
      this.router.navigateByUrl('admin')
    }
    // else
    // {
    //   this.message= "Unable to find User";
    //   console.log("Invalid Credentials");
    // }
  }

  checkUserForNull():boolean
  {
    if(this.user.name=='')
    {
      this.message = "UserName not provided"
      return true;
    }
    else if(this.user.password=='')
    {
     this.message = "Password not provided"
     return true;
    }
    else
    {
      return false;
    }
    
  }

}