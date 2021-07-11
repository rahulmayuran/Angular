import { Component, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  loginUserForm:FormGroup;

  flag:boolean = false;
  
  Login:string = "Value";


  constructor(private router:Router)
  {

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
    if(this.loginUserForm.value.username == 'admin' && 
    this.loginUserForm.value.password == 'admin')
    {
      this.Login = "Welcome Admin"
      this.router.navigateByUrl('admin')
      this.flag = true;
      
    }
    else if(this.loginUserForm.value.username == 'user' && 
    this.loginUserForm.value.password == 'user')
    {
      this.Login = "Welcome User"
      this.router.navigateByUrl('user')
      this.flag = true;
      
    }
    else{
      this.router.navigateByUrl('error')
      this.flag = false;
      console.log("Invalid Credentials")
    }
  }
}