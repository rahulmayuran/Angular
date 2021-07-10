import { Component, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent{

  @Input()
  loginUserForm:FormGroup;

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

  Login(){
    console.log("send login request to server");
        console.log(this.loginUserForm)
        console.log(this.loginUserForm.value)
        this.loginUserForm.reset();
  }

  validateCred()
  {
    if(this.loginUserForm.value.username == 'admin' && 
    this.loginUserForm.value.password == 'admin')
    {
      
    }
    else if(this.loginUserForm.value.username == 'user' && 
    this.loginUserForm.value.password == 'user')
    {

    }
    else{
      console.log("Invalid Credentials")
    }
  }
}
