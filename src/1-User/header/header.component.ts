import { Component} from '@angular/core';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  Login:string = "";

  constructor() { 
    console.log("In header component, Login Value is "+ this.Login);
    this.Login = "support";
  }

}

