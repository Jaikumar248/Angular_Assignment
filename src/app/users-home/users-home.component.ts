import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser } from '../data-type';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {
  allUsers: any;
  viewUserForm: boolean = false;

  messages: Message[] = [];
  messages1: Message[] = [];
  username:any;
  emailId:any;
  addUsers:any;
  savedValues1:boolean = false;
  dialogValues:any;
  constructor(private http: HttpClient, private service: UserServiceService, private router: Router) {
    this.VeiwAllUsers();
  }

  ngOnInit(): void {
    this.addUsers = this.service.addusers;
  }
  showCreateUserForm() {
    this.viewUserForm = true;
  }

  CreateUser(data: CreateUser) {
    this.service.UserCreate(data).subscribe((result) => {
    });
    
    this.savedValues1 = false;
    this.router.navigate(['/home/user-detials']);

  }
  VeiwAllUsers() {
    this.service.GetAllUsers().subscribe((result) => {
      this.allUsers = result;

    })
  }
  // showTicketForm() {
  //   this.router.navigate(['/create-ticket'])
  // }

  

  saveUsers(data:any){
    this.username = data.userName;
    this.emailId = data.email_Id;
    // console.log(this.username);
    // console.log(this.emailId);
    this.service.GetAllUsers().subscribe((result)=>{
      this.dialogValues = result;
      for(let item of this.dialogValues){
        if(data.email_Id === item.email_Id){
         
          // console.log("Dupliate mail id does not exits ");
          this.messages = [
            { severity: 'error', summary: 'email id is already exits'}
          ]
          this.savedValues1 = false;
          this.addUsers = true;
          break;
        }
       
        // else if(data.email_Id === '' && data.userName === ''){
        //   this.savedValues1 = false;
        //   this.addUsers = false;
        //   // console.log("Dupliate mail id does not exits ")
        //   break;
        // }
        else{
          this.savedValues1 = true;
          this.addUsers = false;

        }
       
      }
    })
  }

  closeDialogPop(){
    this.addUsers = false;
  
  }

 
}
