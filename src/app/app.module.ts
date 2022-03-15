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

import { StockService } from "./services/stock.service";
import { UserService } from "./services/user.service";
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from "@azure/msal-angular";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { environment } from "src/environments/environment";


const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [MsalGuard]

  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [MsalGuard]

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
    canActivate: [MsalGuard]
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
    ConfirmationComponent],
  imports: [BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth: {
          clientId: "c51ef931-6bc6-403c-b7f1-6b0d35d9f9d9",
          redirectUri: environment.logoutUrl,
          authority: 'https://login.microsoftonline.com/8aac3eeb-5127-45ea-b1ef-454856977e68'
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: false
        }
      }
    ),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ["https://graph.microsoft.com/v1.0/me",
              ['user.read']
            ]
          ]
        )
      })
  ],
  providers: [UserService,
    StockService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent],
  exports: []
})
export class AppModule { }
