import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { BehaviorSubject } from 'rxjs';
import { TicketServiceService } from '../services/ticket-service.service';
import { Message, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showusers: any;
  adminValue: any;
  adminKeys: any;
  adminObject: any;
  msgs: Message[] = [];
  msgsSuccess: Message[] = [];

  constructor(private route: Router, private service: UserServiceService, private ticketService: TicketServiceService, private toastr: ToastrService, private messageService: MessageService,
    private location: Location) {

  }
  ngOnInit(): void {

    if (localStorage.getItem('loggedInUser')) {
      this.route.navigate(['/home']);
    }
    if (localStorage.getItem('admin')) {
      this.route.navigate(['/home']);
    }
  }

  // Login user or admin
  loginSubmit(data: any) {
    this.service.GetAllUsersForLogin().subscribe((result) => {
      this.showusers = result;
      for (let item of this.showusers) {
        console.log(item.isAdmin);
        if (item.isAdmin && data.email_Id === item.email_Id) {
          console.log(item.isAdmin, "admin");
          if (data.email_Id === data.password) {
            localStorage.setItem('admin', JSON.stringify(item));
            this.service.ReloadToAdmin();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
          }
          this.msgs = [{ severity: 'error', summary: 'Wrong Credentials', detail: "..." }];
        }
        else {
          if (data.email_Id === item.email_Id && !data.isAdmin) {
            console.log(item.isAdmin, "user");
            if (data.email_Id === data.password) {
              localStorage.setItem('loggedInUser', JSON.stringify(item));
              this.service.ReloadData();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
            }
          }
          else {
            this.msgs = [{ severity: 'error', summary: 'Wrong Credentials', detail: "..." }];
          }
        }
      }
    });
  }

  //After page refresh this method will reload the current route. 
  refresh(): void {
    this.route.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.route.navigate([decodeURI(this.location.path())]);
    });
  }
}
