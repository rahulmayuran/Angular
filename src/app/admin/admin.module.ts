import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportsComponent } from './reports/reports.component';
import { AddStockComponent } from './add-stocks/add-stock.component';
import { ConfirmationComponent } from '../others/confirmation/confirmation.component';

const adminRoutes: Routes = [
  // {path: "/admin/:name", loadChildren ()=>{} canActivate:[LoginGuard] }
]

@NgModule({
  declarations: [AdminComponent, AddStockComponent, ReportsComponent, ConfirmationComponent],
  imports: [CommonModule, BrowserModule, AdminModule, RouterModule.forChild(adminRoutes),
    FormsModule, ReactiveFormsModule, NgbModule, NgbDate, NgbDatepicker],
  providers: [],
  bootstrap: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
