import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CreateUser } from '../data-type';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-detials',
  templateUrl: './user-detials.component.html',
  styleUrls: ['./user-detials.component.css']
})
export class UserDetialsComponent implements OnInit {

  showAllUsers: any;
  viewUser: any;
  displayUserDetails: boolean = false;
  displayUserTable: boolean = true;
  displayEditUserForm: boolean = false;
  modifiedSource: any;
  addUsersButton:any;
  messages: Message[] = [];
  messages1: Message[] = [];
  username: any;
  emailId: any;
  addUsers: any;
  openUserForm: boolean = false;
  dialogValues: any;
  createdSourceType: any;
  createdModifiedValue: any;
  modifiedSourceType:any;
  createdSource:any;
  adminUserType:any;

  constructor(private userService: UserServiceService, private ticketService: TicketServiceService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private activeRoute: ActivatedRoute,
    private toastr: ToastrService, private location: Location) { }


  ngOnInit(): void {
    this.ShowAllUsers();

    this.refresh();

    if(localStorage.getItem('admin')){
      this.createdModifiedValue = localStorage.getItem('admin');
      this.createdModifiedValue = JSON.parse( this.createdModifiedValue);
      // this.modifiedSource = this.createdModifiedValue.userName;
      // this.modifiedSourceType = "admin";
    }

  }
  
  @ViewChild('adduser') form:NgForm | undefined;
  //Fetching all users 
  ShowAllUsers() {
    this.userService.GetAllUsers().subscribe((result) => {
      this.showAllUsers = result;
    });
  }

  //Delete user here 
  DeleteUser(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure To Delete Selected Object? Click Yes To Delete',
      accept: () => {
        this.userService.DeleteUser(id).subscribe((result) => {
          this.ShowAllUsers();
        },
          error => {
            this.ShowAllUsers();
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Deleted Successful' });
          }
        );
      }
    });
  }

  // upDateUser() {
  //   this.ticketService.UpdateUserForm();
  // }

  // On double click on particular row in user table it will open view mode.
  UserViewMode(item: any) {
    this.viewUser = item;
    this.displayUserDetails = true;
    this.displayUserTable = false;
  }

  //On click edit button it will open update user form.
  EditUser() {
    this.displayEditUserForm = true;
    this.displayUserDetails = false;
  }

  //On click cancel button it will close update user form
  closeUpdateForm() {
    this.displayEditUserForm = false;
    this.displayUserTable = true;
    this.displayUserDetails = false;
  }

  //updating the user
  UpdateUserForm(data: any) {
    // this.modifiedSource = this.createdModifiedValue.userName;
    // this.modifiedSourceType = "admin";
    data.modifiedSource = this.createdModifiedValue.userName;
    data.modifiedSourceType = "admin";
    this.userService.UpdateUser(data).subscribe((result) => {
      this.toastr.success(' User Updated  successfully');
    }, (error) => {
      this.ShowAllUsers();
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'user is update successfully' });
    });
    this.displayEditUserForm = false;
    this.displayUserTable = true;
  }

  // Add user dialog box will open here
  AddUsersPop() {
    this.addUsersButton = true;
    this.displayUserTable = true;
    this.displayUserDetails = false;
    this.displayEditUserForm = false;
  }

  //After page refresh this method will reload the current route.
  refresh(): void {
    this.router.navigateByUrl('/home/userDetails', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  // Add user dialog box will close here
  closeDialogPop() {
    this.addUsersButton = false;
    this.displayUserTable = true;
    this.openUserForm = false;
    this.form?.reset();
  }

  //Checking email id here for creating a user
  saveUsers(data: any) {
    this.username = data.userName;
    this.emailId = data.email_Id;
    this.userService.GetAllUsers().subscribe((result) => {
      this.dialogValues = result;
      for (let item of this.dialogValues) {
        if (data.email_Id === item.email_Id) {
          this.messageService.add({ severity: 'error', summary: 'error', detail: ' email id is already exits'});
          this.openUserForm = false;
          this.addUsersButton = true;
          this.displayUserTable = true;
          break;
        }
        else {
          this.openUserForm = true;
          this.addUsersButton = false;
          this.displayUserTable = false;
        }
      }
    });
    this.form?.reset();
  }

  //Close User form
  closeUserForm(){
    this.openUserForm = false;
    this.displayUserTable = true;
  }

  // For Creating a user
  CreateUser(data: CreateUser) {
    
    this.userService.UserCreate(data).subscribe((result) => {
      console.log(result);
    }, (error) => {
      this.ShowAllUsers();
      this.messageService.add({ severity: 'success', summary: 'success', detail: ' New user is created successfully' });
    });
    this.openUserForm = false;
    this.displayUserTable = true;
    this.adminUserType = '';
  }
}
