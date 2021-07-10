import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './Roles/admin/admin.module';
import { UserModule } from './Roles/user/user.module';
import { AdminComponent } from './Roles/admin/admin.component';
import { UserComponent } from './Roles/user/user.component';

@NgModule({
  declarations: [AppComponent,LoginComponent,AdminComponent,UserComponent],
  imports: [BrowserModule,FormsModule,ReactiveFormsModule, AppRoutingModule,
  AdminModule,UserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
