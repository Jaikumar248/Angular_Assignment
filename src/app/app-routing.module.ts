import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from './auth.guard';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { UserDetialsComponent } from './user-detials/user-detials.component';
import { UserViewComponent } from './user-view/user-view.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'createtickets', component: CreateTicketComponent, canActivate: [AdminGuard] },
      { path: 'ticketdetails', component: AdminHomeComponent, canActivate: [AuthGuard] },
      { path: 'ticketdetails/:ticketId', component: UserViewComponent, canActivate: [AdminGuard] },
      { path: 'message', component: MessageComponent },
      { path: 'userdetails', component: UserDetialsComponent, canActivate: [AuthGuard] },
      { path: 'viewtickets', component: ViewTicketComponent, canActivate: [AdminGuard] },
      { path: '**', redirectTo: 'message' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
