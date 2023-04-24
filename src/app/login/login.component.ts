import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Message, MessageService } from 'primeng/api';


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

  constructor(private service: UserServiceService, private messageService: MessageService) {

  }
  ngOnInit(): void {

  }

// Login user or admin here
  loginSubmit(data: any) {
  
      if (data.emailId === data.password){
        this.service.checkForLogin(data.emailId).subscribe((result) => {
          this.showusers = result;
        
        if (this.showusers.isAdmin && this.showusers.emailId){
          localStorage.setItem('admin', JSON.stringify(this.showusers));
          this.service.reloadToAdmin();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
        }
        else if ( (this.showusers.emailId && !this.showusers.isAdmin)){
          localStorage.setItem('loggedInUser', JSON.stringify(this.showusers));
            this.service.reloadData();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
        }
      });
      }
      else {
        this.msgs = [{ severity: 'error', summary: 'Wrong Credentials', detail: "..." }];
      }
   
  }

}
