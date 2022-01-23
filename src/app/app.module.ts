import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AddStockComponent } from "./admin/add-stocks/add-stock.component";
import { AdminComponent } from "./admin/admin.component";
import { ReportsComponent } from "./admin/reports/reports.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./others/header/header.component";
import { LoginComponent } from "./others/login/login.component";
import { RegisterComponent } from "./others/register/register.component";

import { BookingService } from "./services/booking.service";
import { StockService } from "./services/stock.service";
import { UserService } from "./services/user.service";

const routes:Routes = [
  {path:"", component:LoginComponent},
  {path:"admin", component:AdminComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"addAirline", component:AddStockComponent},
  {path:"report", component:ReportsComponent}
]

@NgModule({
  declarations: [AppComponent,  LoginComponent, AdminComponent, HeaderComponent,RegisterComponent,AddStockComponent,ReportsComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule,ReactiveFormsModule, NgbModule, HttpClientModule],
  providers: [UserService,StockService, BookingService],
  bootstrap: [AppComponent],
  exports :[]
})
export class AppModule { }
