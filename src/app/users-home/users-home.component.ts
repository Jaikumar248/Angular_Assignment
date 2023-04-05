import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../data-type';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private http: HttpClient, private service: UserServiceService, private router: Router, private toastr:ToastrService) {
    
  }

  ngOnInit(): void {
    this.addUsers = this.service.addusers;
    this.VeiwAllUsers();
  }
  showCreateUserForm() {
    this.viewUserForm = true;
  }

  CreateUser(data: CreateUser) {
    this.service.UserCreate(data).subscribe((result) => {
      
      this.toastr.success('A new user is Created');
    },(error)=>{
      this.VeiwAllUsers();
    }
    );
    
    this.savedValues1 = false;
    this.router.navigate(['/home/user-detials']);

  }
  VeiwAllUsers() {
    this.service.GetAllUsers().subscribe((result) => {
      this.allUsers = result;
      // this.router.navigate(['/home/user-detials']);
    })
  }
 

  

  saveUsers(data:any){
    this.username = data.userName;
    this.emailId = data.email_Id;
    this.service.GetAllUsers().subscribe((result)=>{
      this.dialogValues = result;
      for(let item of this.dialogValues){
        if(data.email_Id === item.email_Id){
           this.messages = [
            { severity: 'error', summary: 'email id is already exits'}
          ]
          this.savedValues1 = false;
          this.addUsers = true;
          break;
        }
       
        else{
          this.savedValues1 = true;
          this.addUsers = false;

        }
       
      }
    })
  }


  closeDialogPop(){
    this.addUsers = false;
    this.router.navigate(['/home/user-detials']);
  }

 
}
