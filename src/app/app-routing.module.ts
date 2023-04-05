import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AuthGuard } from './auth.guard';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';

import { UserDetialsComponent } from './user-detials/user-detials.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersHomeComponent } from './users-home/users-home.component';

const routes: Routes = [
  
  {path: '', component:LoginComponent},

  {path: 'home', component:HomeComponent,
   canActivate:[AuthGuard],
  children: [
    {path: 'create-ticket', component:CreateTicketComponent, canActivate:[AuthGuard]},
      {path: 'admin-home', component:AdminHomeComponent, canActivate:[AuthGuard] },
    {path: 'admin-view', component:AdminViewComponent , canActivate:[AuthGuard]},
    {path: 'users-home', component:UsersHomeComponent, canActivate:[AuthGuard]},
    {path: 'user-view', component:UserViewComponent, canActivate:[AuthGuard]},
    {path: 'user-view/:ticket_id', component:UserViewComponent, canActivate:[AuthGuard]},
    {path: 'message', component:MessageComponent, canActivate:[AuthGuard]},
    {path: 'user-detials', component:UserDetialsComponent, canActivate:[AuthGuard]}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
