import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UserService } from 'src/3-Services/user.service'

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
            .subscribe(  (data)=> {
                      console.log("User array length "+data.length)
                      // To iterate through the user array
                      for (let i = 0; i < data.length; i++) 
                      {
                        let names = data[i].name ;
                        let passkeys = data[i].password ;

                        //Data persisted in json server
                        console.log("Names/password in the DB are "+names+"/"+passkeys);
                        //Form Data
                        console.log("Form userName "+this.loginUserForm.value.username);
                        console.log("Form password "+this.loginUserForm.value.password);

                        if(data[i].name == this.loginUserForm.value.userName
                          || data[i].password == this.loginUserForm.value.password)
                        {
                          console.log("Names/passwords matched with form data")
                          this.router.navigateByUrl('user')
                        }
                      } //End of For loop
                     }) //End of Subscription
                      && this.user.role=='USER')//End of ElseIf condition
    {
      console.log("Names/passwords matched with form data")
      this.router.navigateByUrl('user')
    }
    else
    {
      this.message= "Unable to find User";
      console.log("Invalid Credentials");
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
    else
    {
      return false;
    }
    
  }

}