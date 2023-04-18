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
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component:HomeComponent, 
  children: [
    {path: 'createTicket', component:CreateTicketComponent, canActivate:[AdminGuard]},
    {path: 'adminHome', component:AdminHomeComponent, canActivate:[AuthGuard] },
    {path: 'admin-view', component:AdminViewComponent , canActivate:[AuthGuard]},
    {path: 'users-home', component:UsersHomeComponent, canActivate:[AuthGuard]},
    {path: 'userView', component:UserViewComponent, canActivate:[AdminGuard]},
    {path: 'userView/:ticket_id', component:UserViewComponent, canActivate:[AdminGuard]},
    {path: 'message', component:MessageComponent},
    {path: 'userDetails', component:UserDetialsComponent, canActivate:[AuthGuard]},
    {path: 'viewTicket', component:ViewTicketComponent,  canActivate:[AdminGuard]}  
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
