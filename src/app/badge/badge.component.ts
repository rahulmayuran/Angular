import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: 'badge.component.html',
  styleUrls: ['badge.component.scss']
})
export class BadgeComponent {

  // Binding of badge.component.html to use the below text
  // It needs @Input , so that app.component.html can read the other component's inputs.

  @Input()
    interpolation = "Use Code"

  @Input() count = 34

    // This bgcolor should be used in app.component.html as [bgcolor]
    @Input("bgcolor")
    //This BGcolor should match with batch.component.html's expression in [ngStyle]
    BGcolor="rgba(255, 0, 0, 0.76)";

    //Suppose I want the counter to increase, so using inc operator on count
    increase(){
      this.count++;
    }

    //An interesting requirment, click outside for +1 and inside for *2.
    //element belongs to any type, it is actually number, but if you declare it as a number
    //then you can't bind it in <span> tag. so we parse the innerText

    double(element:any){
      console.log(element.innerText);
      this.count = (parseInt(element.innerText)*2)-1;
    }
}
