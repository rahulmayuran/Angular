import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { UserComponent } from "./user/user.component";
import { ConfirmationComponent } from './others/confirmation/confirmation.component';
import { UserListComponent } from "./admin/user-list/user-list.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "admin",
    component: AdminComponent,

  },
  {
    path: "user",
    component: UserComponent,
  },
  {
    path: "login",
    component: LoginComponent,

  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "company_stock",
    component: AddStockComponent,
  },
  {
    path: "report",
    component: ReportsComponent,
  },
  {
    path: "user-list",
    component: UserListComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    RegisterComponent,
    AddStockComponent,
    ReportsComponent,
    UserComponent,
    ConfirmationComponent,
    UserListComponent],
  imports: [BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
