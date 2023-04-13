import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../data-type';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {
  allUsers: any;
  messages: Message[] = [];
  messages1: Message[] = [];
  username:any;
  emailId:any;
  addUsers:any;
  openUserForm:boolean = false;
  dialogValues:any;
  createdSourceType:any;

  constructor(private http: HttpClient, private service: UserServiceService, private router: Router, private toastr:ToastrService,
    private location:Location) {
    
  }

  ngOnInit(): void {
    this.addUsers = this.service.addusers;
    this.VeiwAllUsers();
    this.refresh();

    if(localStorage.getItem('admin')){
      this.createdSourceType = "admin";
    }
    if(localStorage.getItem('loggedInUser')){
      this.createdSourceType = "user";
    }

  }

  CreateUser(data: CreateUser) {
    console.log(data)
    this.service.UserCreate(data).subscribe((result) => {
      console.log("user is added success");
     
    },(error)=>{
      
      console.log("user is added");
      this.VeiwAllUsers();
      this.router.navigate(['/home/user-detials']);
    }
    );
    this.openUserForm = false;
   

  }
  VeiwAllUsers() {
    this.service.GetAllUsers().subscribe((result) => {
      this.allUsers = result;
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
          this.openUserForm = false;
          this.addUsers = true;
          break;
        }     
        else{
          this.openUserForm = true;
          this.addUsers = false;
        }
       
      }
    })
  }


  closeDialogPop(){
    this.addUsers = false;
    this.router.navigate(['/home/user-detials']);
  }

  refresh():void {
    this.router.navigateByUrl('/home/users-home', {skipLocationChange : true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  closeUserForm(){
    this.router.navigate(['/home/user-detials']);
  }

 
}
