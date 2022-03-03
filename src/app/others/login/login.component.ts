import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {

  user: any = {};
  message: string = '';
  navToRegister: string = 'Register';
  flagErrors:boolean = false;


  constructor(private router: Router, private userService: UserService) { }

  validateCred() {
    this.userService.getUserByName(this.user.username).subscribe(
      (userData) => {
        if(userData && userData.userId){
          if(userData.password === this.user.password){
            if(userData.role === 'USER')
            {
            sessionStorage.setItem('uName',userData.username);
            this.router.navigateByUrl('user')
            } 
            else if(userData.role === 'ADMIN')
            {
            sessionStorage.setItem('uName',userData.username);
            this.router.navigateByUrl('admin')
            }
          }
          else{
            this.flagErrors = true;
            this.message = 'Wrong password, please retype'
            setTimeout(() => {
              this.flagErrors = false;
            }, 2500);
          }
        }
        else{
          this.flagErrors = true;
          this.message = 'User not found, please register'
          setTimeout(() => {
            this.flagErrors = false;
          }, 2500);
        }
      })
  }

  checkUserForNull(): boolean {
    if (this.user.name == '') {
      this.message = "UserName not provided"
      return true;
    }
    else if (this.user.password == '') {
      this.message = "Password not provided"
      return true;
    }
    else {
      return false;
    }

  }

}