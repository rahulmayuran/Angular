import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BadgeComponent } from './badge/badge.component';
import { DirectivesComponent } from './directives/directives.component';

@NgModule({
  declarations: [AppComponent, BadgeComponent, DirectivesComponent],
  imports: [BrowserModule],
  providers: [],
  exports : [],
  bootstrap: [AppComponent]
})
export class AppModule { }
