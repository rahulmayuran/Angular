import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Login/login.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes = [
  {path : 'login', component : LoginComponent},
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers : []
})
export class AppRoutingModule { }
