import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/3-Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:any = [];
  registerForm:FormGroup;
  message:string = '';
  successMsg:string = '';


  constructor(private userService:UserService, private route:Router) 
  {
    this.user= {role:''};

    this.registerForm = new FormGroup({
      username : new FormControl("", [
            Validators.required,
            Validators.pattern("[a-zA-Z]{1,}") 
      ]),
      password : new FormControl("", [
            Validators.required,
            Validators.minLength(8)
      ]),
      repassword : new FormControl("", [
            Validators.required,
            Validators.minLength(8)
      ])
    })
   }

  ngOnInit(): void {
  }


  Register()
  {
     if( this.checkUserForNull() )
      return; 

    if(this.registerForm.value.username == 'admin'
                && this.registerForm.value.password == 'admin'
                   && this.registerForm.value.repassword == 'admin')
      {
        this.message = "Already registered as admin."
      }
    else if(this.userService.getUserByName(this.user.username)
            .subscribe(  (data:any)=> 
                {
                  if(data.username  != this.registerForm.value.username
                    && data.password != this.registerForm.value.password)
                  {
                    this.user.role = 'USER';
                    console.log(JSON.stringify(data));
                    console.log(JSON.stringify(this.user));
                    this.userService.saveUser(this.user);
                    this.successMsg = "New User SuccessFully Registered";
                  }
                  else if(data.username  == this.registerForm.value.username
                    && data.password == this.registerForm.value.password)
                  {
                    this.successMsg = "Already Existing User";
                  }
                }) //End of Subscription
                  )//End of ElseIf condition
          {     
            this.message = "Already Existing User"
          }
          else
          {
            this.message = "Try Registering after sometime"
          }
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
    else if(this.user.password != this.user.repassword)
    {
      this.message = "Retype password again!"
      return true;
    }
    else{
      return false;
    }
    
  }
 

}
