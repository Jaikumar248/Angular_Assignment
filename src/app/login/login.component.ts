import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { BehaviorSubject } from 'rxjs';
import { TicketServiceService } from '../services/ticket-service.service';
import { Message } from 'primeng/api';
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

  constructor(private route: Router, private service: UserServiceService, private ticketService: TicketServiceService) {

  }
  ngOnInit(): void {
    this.service.ReloadData();
    this.ticketService.GetAdminDetails().subscribe((result)=>{
      // localStorage.setItem('aadmin', JSON.stringify(result));
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
    
    // if (data.email_Id === "admin" && data.password === "admin") {
    //   localStorage.setItem('admin', JSON.stringify(data));
    //   this.service.ReloadToAdmin();
    // }

    if(data.email_Id === this.adminValue){
      if(data.email_Id === data.password){
        localStorage.setItem('admin', JSON.stringify(this.adminObject));
        this.service.ReloadToAdmin();
        this.msgs = [{severity:'info', summary:'Wrong Credentials', detail:"..."}];
      }
    }

    else {
      this.service.GetAllUsers().subscribe((result) => {
        this.showuser = result;
       
       for(let item of this.showuser){
        if(data.email_Id === item.email_Id){
          if(data.email_Id === data.password){         
            localStorage.setItem('loggedInUser', JSON.stringify(item));
            this.msgs = [{ severity: 'success', summary: 'successfully logged in user', detail:".."}];
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

}
