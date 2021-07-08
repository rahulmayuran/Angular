import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BadgeComponent } from './badge/badge.component';

@NgModule({
  declarations: [AppComponent, BadgeComponent],
  imports: [BrowserModule],
  providers: [],
  exports : [],
  bootstrap: [AppComponent]
})
export class AppModule { }
