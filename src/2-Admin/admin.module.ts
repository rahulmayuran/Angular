import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { NgbDate, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportsComponent } from './reports/reports.component';


const adminRoutes:Routes  = [
  // {path: "/admin/:name", loadChildren ()=>{} canActivate:[LoginGuard] }
]

@NgModule({
  declarations: [AdminComponent,AddFlightComponent, ReportsComponent],
    imports: [CommonModule,BrowserModule,AdminModule, RouterModule.forChild(adminRoutes),
    FormsModule, ReactiveFormsModule, NgbModule,NgbDate, NgbDatepicker],
  providers: [],
  bootstrap: [AdminComponent],
  exports : [AdminComponent]
})
export class AdminModule { }
