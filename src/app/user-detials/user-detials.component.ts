import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
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
  addUsersButton: any;
  userNameField: any;
  emailIdField: any;
  addUsers: any;
  openUserForm: boolean = false;
  dialogValues: any;
  createdSourceType: any;
  createdModifiedValue: any;
  modifiedSourceType: any;
  createdSource: any;
  adminUserType: any;
  @ViewChild('adduser') form: NgForm | undefined;

  constructor(private userService: UserServiceService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private toastr: ToastrService, private location: Location) { }


  ngOnInit(): void {
    this.showUsers();
    this.refresh();
    if (localStorage.getItem('admin')) {
      this.createdModifiedValue = localStorage.getItem('admin');
      this.createdModifiedValue = JSON.parse(this.createdModifiedValue);
      this.createdSource = this.createdModifiedValue.userName;
      this.createdSourceType = "admin";
    }
  }

  //Fetching all users 
  showUsers() {
    this.userService.getAllUsers().subscribe((result) => {
      this.showAllUsers = result;
    });
  }

  //Delete user here 
  deleteUser(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure To Delete Selected Object? Click Yes To Delete',
      accept: () => {
        this.userService.deleteUser(id).subscribe((result) => {
          this.showUsers();
        },
          error => {
            this.showUsers();
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Deleted Successful' });
          }
        );
      }
    });
  }

  // On double click on particular row in user table it will open view mode.
  userViewMode(item: any) {
    this.viewUser = item;
    this.displayUserDetails = true;
    this.displayUserTable = false;
  }

  //On click edit button it will open update user form.
  editUser() {
    this.displayEditUserForm = true;
    this.displayUserDetails = false;
  }

  //On click cancel button it will close update user form.
  closeUpdateForm() {
    this.displayEditUserForm = false;
    this.displayUserTable = true;
    this.displayUserDetails = false;
  }

  //updating the user.
  updateUserForm(data: any) {
    data.modifiedSource = this.createdModifiedValue.userName;
    data.modifiedSourceType = "admin";
    this.userService.updateUser(data).subscribe((result) => {
      this.toastr.success(' User Updated  successfully');
    }, (error) => {
      this.showUsers();
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'user is update successfully' });
    });
    this.displayEditUserForm = false;
    this.displayUserTable = true;
  }

  // Add user dialog box will open here.
  addUsersPop() {
    this.addUsersButton = true;
    this.displayUserTable = true;
    this.displayUserDetails = false;
    this.displayEditUserForm = false;
  }

  //After page refresh this method will reload the current route.
  refresh(): void {
    this.router.navigateByUrl('/home/userdetails', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  // Add user dialog box will close here.
  closeDialogPop() {
    this.addUsersButton = false;
    this.displayUserTable = true;
    this.openUserForm = false;
    this.form?.reset();
  }

  //Checking email id here for creating a user.
  saveUsers(data: any) {
    this.userNameField = data.userName;
    this.emailIdField = data.emailId;
    this.userService.getAllUsers().subscribe((result) => {
      this.dialogValues = result;
      for (let item of this.dialogValues) {
        if (data.emailId === item.emailId) {
          this.messageService.add({ severity: 'error', summary: 'error', detail: ' email id is already exits' });
          this.userNameField = data.userName;
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

  //Close User form.
  closeUserForm() {
    this.openUserForm = false;
    this.displayUserTable = true;
    this.adminUserType = '';
  }

  // For Creating a user.
  createUser(data: CreateUser) {
    this.userService.userCreate(data).subscribe((result) => {
    }, (error) => {
      this.showUsers();
      this.messageService.add({ severity: 'success', summary: 'success', detail: ' New user is created successfully' });
    });
    this.openUserForm = false;
    this.displayUserTable = true;
    this.adminUserType = '';
  }
}
