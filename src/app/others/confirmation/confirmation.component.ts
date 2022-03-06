import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnChanges {

  @Input()
  yesText: string = 'Yes';

  @Input()
  noText: string = 'No';

  @Input()
  popupTitle: string = 'Confirmation';

  @Input()
  popupQuestion: string = 'Are you sure?';

  @Output() action = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges() {
    console.log(this.yesText, this.popupQuestion);
  }

  ngOnInit() { }
  onClick(action: boolean) {
    this.action.emit(action);
  }
}
