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
      this.userService.getUserByName(this.user.name)
       .subscribe( (data)=>
       { 
          if(this.registerForm.value.username == ''
                 && this.registerForm.value.password == '')
            {
            console.log("No details provided")
            this.message = "Kindly fill all details"
            }
            else if(this.registerForm.value.password != this.registerForm.value.password){
              console.log("No details provided")
              this.message = "Password mismatch"
            }
          else if(this.registerForm.value.username == 'admin'
                     && this.registerForm.value.password == 'admin')
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
          
                        if( this.registerForm.value.username
                          && this.registerForm.value.password)
                        {
                          console.log("Names/passwords matched with form data")
                          this.route.navigateByUrl('user')
                        }
                     }) //End of Subscription
                           )//End of ElseIf condition
          {
            this.userService.saveUser(this.user);
            console.log("The user is already registered");
            this.message = "The user is already registered"
          }
          else
          {
            this.route.navigateByUrl('/register');
          }
    });
  }

 

}
