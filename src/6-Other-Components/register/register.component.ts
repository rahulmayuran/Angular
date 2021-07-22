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
    this.user= {id:0 ,name:'',password:'',role:''};

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
    else if(this.registerForm.value.username == this.userService
        .getUserByName(this.user.name)
        .subscribe(  
              (data)=> {
                //data is in MySQl
                let stringData = JSON.stringify(data)
                console.log("JSON "+stringData)

                  if(data[1] != this.registerForm.value.username
                    && data[2] != this.registerForm.value.password
                    && data[2] != this.registerForm.value.repassword)
                  {
                    this.successMsg = "New User SuccessFully Registered"
                    this.userService.saveUser(this.user);
                  }
                }) //End of Subscription
                  )//End of ElseIf condition
          {     
            console.log("The user is already registered");
            this.message = "Already Existing User"
      }
      else
      {
        this.route.navigateByUrl('/register');
      }
  }

  checkUserForNull():boolean
  {
    if(this.user.name=='')
    {
      console.log('Name is not provided');
      this.message = "UserName not provided"
      return true;
    }
    else if(this.user.password=='')
    {
     console.log("password is not provided");
     this.message = "Password not provided"
     return true;
    }
    else if(this.user.password != this.user.repassword)
    {
      console.log("password mismatch!");
      this.message = "Retype password again!"
      return true;
    }
    else{
      return false;
    }
    
  }
 

}
