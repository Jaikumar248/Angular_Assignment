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

  constructor(private userService: UserServiceService, private ticketService: TicketServiceService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private activeRoute: ActivatedRoute,
    private toastr: ToastrService, private location: Location) { }


  ngOnInit(): void {
    this.ShowAllUsers();
    let userId = this.activeRoute.snapshot.paramMap.get('ticket_id');
    
    this.refresh();

    if (localStorage.getItem('admin')) {
      this.modifiedSource = "admin";
    }
    if (localStorage.getItem('loggedInUser')) {
      this.modifiedSource = "user";
    }
    if (localStorage.getItem('admin')) {
      this.createdSourceType = "admin";
    }
    if (localStorage.getItem('loggedInUser')) {
      this.createdSourceType = "user";
    }
  }
  @ViewChild('adduser') form:NgForm | undefined;
  ShowAllUsers() {
    this.userService.GetAllUsers().subscribe((result) => {
      this.showAllUsers = result;
    })
  }

  DeleteUser(id: any) {

    this.confirmationService.confirm({
      message: 'Are you sure To Delete Selected Object? Click Yes To Delete',
      accept: () => {
        this.userService.DeleteUser(id).subscribe((result) => {
          this.ShowAllUsers();
          this.toastr.success(' User Deleted  successfully');
        },
          error => {
            this.ShowAllUsers();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
          }
        )
      }
    })
  }

  upDateUser() {
    this.ticketService.UpdateUserForm();
  }

  UserViewMode(item: any) {
    this.viewUser = item;
    this.displayUserDetails = true;
    this.displayUserTable = false;
  }

  EditUser() {
    this.displayEditUserForm = true;
    this.displayUserDetails = false;
  }

  closeUpdateForm() {
    this.displayEditUserForm = false;
    this.displayUserTable = true;
    this.displayUserDetails = false;

  }

  UpdateUserForm(data: any) {
    this.userService.UpdateUser(data).subscribe((result) => {
      this.toastr.success(' User Updated  successfully');
    }, (error) => {
      this.ShowAllUsers();
    });
    this.displayEditUserForm = false;
    this.displayUserTable = true;
  }

  AddUsersPop() {
    // this.userService.AddUsers();
    this.addUsersButton = true;
    this.displayUserTable = true;
    this.displayUserDetails = false;
    this.displayEditUserForm = false;
  }

  refresh(): void {
    this.router.navigateByUrl('/home/user-detials', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  closeDialogPop() {
    this.addUsersButton = false;
    this.displayUserTable = true;
    this.openUserForm = false;
    this.form?.reset();
  }

  saveUsers(data: any) {
    this.username = data.userName;
    this.emailId = data.email_Id;
    this.userService.GetAllUsers().subscribe((result) => {
      this.dialogValues = result;
      console.log(this.dialogValues);
      for (let item of this.dialogValues) {
        if (data.email_Id === item.email_Id) {
          this.messages = [
            { severity: 'error', summary: 'email id is already exits' }
          ]
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

  closeUserForm(){
    this.openUserForm = false;
    this.displayUserTable = true;
  }
  CreateUser(data: CreateUser) {
    this.userService.UserCreate(data).subscribe((result) => {
    }, (error) => {
      this.ShowAllUsers();
      
    });
    this.openUserForm = false;
    this.displayUserTable = true;
  }
}
