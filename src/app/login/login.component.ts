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
export class LoginComponent implements OnInit{
  showuser: any;
  adminValue:any;
  adminKeys:any;
  adminObject:any;
  msgs:Message[]=[];
  msgsSuccess:Message[]=[];

  constructor(private route: Router, private service: UserServiceService, private ticketService: TicketServiceService, private toastr: ToastrService, private messageService:MessageService,
    private location:Location) {

  }
  ngOnInit(): void {
    // this.service.ReloadData();
    
    if(localStorage.getItem('loggedInUser')){
      // this.isUserLoggedIn.next(true);
      this.route.navigate(['/home']);
    }
    if(localStorage.getItem('admin')){
      this.route.navigate(['/home']);
    }

    this.ticketService.GetAdminDetails().subscribe((result)=>{
      // localStorage.setItem('aadmin', JSON.stringify(result));
      this.adminObject = result;
      let vara = Object.keys(result)
      this.adminKeys = vara.toString();
      let vara2 = Object.values(result);
      this.adminValue = vara2.toString();

    });
    // this.refresh();
    // this.service.ReloadToAdmin();
  }
  SignUp() {
    this.route.navigate(['/sign-up'])
  }

  loginSubmit(data: any) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});

    // if (data.email_Id === "admin" && data.password === "admin") {
    //   localStorage.setItem('admin', JSON.stringify(data));
    //   this.service.ReloadToAdmin();
    // }

    if(data.email_Id === this.adminValue){
      if(data.email_Id === data.password){
        localStorage.setItem('admin', JSON.stringify(this.adminObject));
        // this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
        this.service.ReloadToAdmin();
      }
      this.msgs = [{severity:'error', summary:'Wrong Credentials', detail:"..."}];
    }

    else {
      this.service.GetAllUsers().subscribe((result) => {
        this.showuser = result;
       
       for(let item of this.showuser){
        if(data.email_Id === item.email_Id){
          if(data.email_Id === data.password){         
            localStorage.setItem('loggedInUser', JSON.stringify(item));
            // this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
            this.service.ReloadData();
          }
        }
        else {
          this.msgs = [{severity:'error', summary:'Wrong Credentials', detail:"..."}];
          
        }
       }

      })


    }

  }
  refresh():void {
    this.route.navigateByUrl('', {skipLocationChange : true}).then(()=>{
      this.route.navigate([decodeURI(this.location.path())]);
    });
  }

}
