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

    this.ticketService.GetAdminDetails().subscribe((result) => {
      this.adminObject = result;
      let vara = Object.keys(result)
      this.adminKeys = vara.toString();
      let vara2 = Object.values(result);
      this.adminValue = vara2.toString();
    });

  }

  SignUp() {
    this.route.navigate(['/sign-up'])
  }

  loginSubmit(data: any) {
    this.service.GetAllUsers().subscribe((result) => {
      this.showusers = result;
      

      for (let item of this.showusers){
        console.log(item.isAdmin);
        if ( item.isAdmin && data.email_Id === item.email_Id ) {
          console.log(item.isAdmin, "admin");
          if (data.email_Id === data.password) {
            localStorage.setItem('admin', JSON.stringify(item));
            this.service.ReloadToAdmin();
          }
          this.msgs = [{ severity: 'error', summary: 'Wrong Credentials', detail: "..." }];
        }
        else {
          if (data.email_Id === item.email_Id && !data.isAdmin) {
            console.log(item.isAdmin, "user");
            if (data.email_Id === data.password) {
              localStorage.setItem('loggedInUser', JSON.stringify(item));
              this.service.ReloadData();
            }
          }
          else {
            this.msgs = [{ severity: 'error', summary: 'Wrong Credentials', detail: "..." }];
          }
        }
      }
    
    
    
    


})

   
    // else {
    //   this.service.GetAllUsers().subscribe((result) => {
    //     this.showusers = result;
    //     for (let item of this.showusers) {
    //       if (data.email_Id === item.email_Id && !data.isAmdin) {
    //         if (data.email_Id === data.password) {
    //           localStorage.setItem('loggedInUser', JSON.stringify(item));
    //           this.service.ReloadData();
    //         }
    //       }
    //       else {
    //         this.msgs = [{ severity: 'error', summary: 'Wrong Credentials', detail: "..." }];
    //       }
    //     }
    //   })
    // }
  }

  refresh(): void {
    this.route.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.route.navigate([decodeURI(this.location.path())]);
    });
  }
}
