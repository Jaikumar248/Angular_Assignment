import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detials',
  templateUrl: './user-detials.component.html',
  styleUrls: ['./user-detials.component.css']
})
export class UserDetialsComponent implements OnInit{
  showUsers:any;
  viewUser:any;
  displayViewMode:boolean = false;
  displayViewForm:boolean = true;
  editUser:boolean = false;
  nonEditableField:boolean = false;
  disbaleButton:boolean = false;

  constructor(private userService:UserServiceService, private ticketService:TicketServiceService, private router:Router,
    private confirmationService: ConfirmationService, private messageService:MessageService, private activeRoute:ActivatedRoute,
    private toastr:ToastrService){}
 

  ngOnInit(): void {
  //  this.DeleteUserMethod();
   this.ShowAllUsers();
   let userId = this.activeRoute.snapshot.paramMap.get('ticket_id');
    
  }
  // DeleteUserMethod(){
  //   this.userService.GetAllUsers().subscribe((result)=>{
  //     this.showUsers = result;
  //   })
  // }
  ShowAllUsers(){
    this.userService.GetAllUsers().subscribe((result)=>{
      this.showUsers = result;
     })
  }

  DeleteUser(id:any){

    this.confirmationService.confirm({
      message:'Are you sure To Delete Selected Object? Click Yes To Delete',
      accept: () => {
        this.userService.DeleteUser(id).subscribe((result)=>{  
          this.ShowAllUsers();
          this.toastr.success(' User Deleted  successfully');
        },

        error => {
          this.ShowAllUsers();
          this.messageService.add({severity:'error', summary:'Error', detail:error})
        }
        )
      }
    })

  }
  upDateUser(){
    this.ticketService.UpdateUserForm();
  }

  UserViewMode(item:any){
    this.viewUser = item;
    this.displayViewMode = true;
    this.displayViewForm = false;
    this.disbaleButton = false;
  }

  EditUser(){
   this.editUser = true;
   this.displayViewMode = false;
   this.nonEditableField = true;
   this.disbaleButton = false;
  }
  closeUpdateForm(){
    this.editUser = false;
    this.displayViewForm = true;
    this.displayViewMode = false;

  }

  UpdateUserForm(data:any){
    this.userService.UpdateUser(data).subscribe((result)=>{
  
      this.toastr.success(' User Updated  successfully');
    },(error)=>{
      this. ShowAllUsers();
    }
    )
    this.editUser = false;
    this.displayViewForm = true;
  }

  AddUsersPop(){
    this.userService.AddUsers();
    this.displayViewForm = false;
    this.displayViewMode = false;
    this.editUser = false;
    this.disbaleButton = true;
  }



}
