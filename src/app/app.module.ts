import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { BadgeModule } from 'primeng/badge';
import { MessageComponent } from './message/message.component';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { UserDetialsComponent } from './user-detials/user-detials.component';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    CreateTicketComponent,
    HeaderComponent,
    UserViewComponent,
    HomeComponent,
    MessageComponent,
    UserDetialsComponent,
    ViewTicketComponent,
    FooterComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    AccordionModule,
    TableModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    PaginatorModule,
    ConfirmDialogModule,
    BadgeModule,
    DialogModule,
    MessagesModule,
    DropdownModule,
    DataViewModule,
    ToastModule,
    RadioButtonModule,
    ToastrModule.forRoot()
  ],

  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
