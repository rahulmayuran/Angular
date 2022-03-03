import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {};
  message: string = '';
  successmessage:string= ''
  flagErrors:boolean = false;
  flagSuccess:boolean = false;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  Register() {

    this.userService.getUserByName(this.user.username).subscribe(
      (userData) => {
        if (userData && userData.username) {
          this.flagErrors = true;
          this.message = 'User '+userData.username+' already exists'
          setTimeout(() => {
            this.flagErrors = false
          }, 2500);
        }
        else if(!this.user.password || !this.user.emailId ||  !this.user.username){
          this.flagErrors = true;
          this.message = 'Please enter all details'
          setTimeout(() => {
            this.flagErrors = false
          }, 2500);
        }
        else {
          console.log(JSON.stringify(this.user))
          this.userService.saveUser(this.user).subscribe(
            (data:any) => {
              this.flagSuccess = true;
              this.successmessage = JSON.stringify(data.username)+' successfully registered';
              setTimeout(() => {
                this.flagSuccess = false
                this.router.navigateByUrl('login');
              }, 2500);
            });
        }
      })
  }


}
