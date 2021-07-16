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
      ])
    })
   }

  ngOnInit(): void {
  }


  Register()
  {
      this.userService.getUserByName(this.user.name)
       .subscribe( (data)=>
       { 
          if(data[0].name==''&&data[0].password=='')
          {
          console.log("No details provided")
          this.message = "No credentials provided"
          }
          else if(this.registerForm.value.username == 'admin'
          && this.registerForm.value.password == 'admin')
          {
            this.message = "Already registered as admin."
          }
          else if(this.registerForm.value.username == this.userService
                  .getUserByName(this.user.name)
                       .subscribe(  (data)=> {
                              for (let i = 0; i < data.length; i++) 
                                {
                                  if (data[i].name.match(this.registerForm.value.userName)) 
                                    {
                                    console.log("Names/passwords matched with form data")
                                    this.message = "Already existing user. Please Login";
                                    break;
                                    this.route.navigateByUrl("/login");
                                    }
                                    else if (data[i].name != this.registerForm.value.userName
                                      && data[i].password != this.registerForm.value.password)
                                      {
                                      this.user.role="USER";
                                      // No need to subscribe as it is already done in service layer
                                      this.userService.saveUser(this.user);
                                      console.log("Try to login with registered credentials")
                                      this.message = "SuccessFully registered"
                                    }
                                } //End of For loop
                              }) //End of Subscription         
           ) //End of ElseIf condition
           {
            console.log("The user is already registered");
            this.message = "The user is already registered"
          }
          else
          {
            this.route.navigateByUrl('/logout');
          }
    });
  }

 

}
