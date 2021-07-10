import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent {

  names = ["Angular", "CSS", "React", "HTML"]
  flag = false;

  constructor() { 
    console.log(this.names);
  }

  toggleFlag(){
    this.flag = !this.flag;
    console.log("Flag value is "+this.flag)
  }

}
