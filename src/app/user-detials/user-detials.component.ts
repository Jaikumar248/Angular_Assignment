import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-detials',
  templateUrl: './user-detials.component.html',
  styleUrls: ['./user-detials.component.css']
})
export class UserDetialsComponent implements OnInit{
  showAllUsers:any;
  viewUser:any;
  displayUserDetails:boolean = false;
  displayUserTable:boolean = true;
  displayEditUserForm:boolean = false;
  modifiedSource:any;
  

  constructor(private userService:UserServiceService, private ticketService:TicketServiceService, private router:Router,
    private confirmationService: ConfirmationService, private messageService:MessageService, private activeRoute:ActivatedRoute,
    private toastr:ToastrService, private location:Location){}
 

  ngOnInit(): void {
      this.ShowAllUsers();
      let userId = this.activeRoute.snapshot.paramMap.get('ticket_id');
      this.refresh();

      if(localStorage.getItem('admin')){
      this.modifiedSource = "admin";
      }
      if(localStorage.getItem('loggedInUser')){
      this.modifiedSource = "user";
      }
   }

  ShowAllUsers(){
    this.userService.GetAllUsers().subscribe((result)=>{
      this.showAllUsers = result;
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
    this.displayUserDetails = true;
    this.displayUserTable = false;
  }

  EditUser(){
   this.displayEditUserForm = true;
   this.displayUserDetails = false;
  }
  closeUpdateForm(){
    this.displayEditUserForm = false;
    this.displayUserTable = true;
    this.displayUserDetails = false;

  }

  UpdateUserForm(data:any){
    this.userService.UpdateUser(data).subscribe((result)=>{
  
      this.toastr.success(' User Updated  successfully');
    },(error)=>{
      this. ShowAllUsers();
    }
    )
    this.displayEditUserForm = false;
    this.displayUserTable = true;
  }

  AddUsersPop(){
    this.userService.AddUsers();
    this.displayUserTable = false;
    this.displayUserDetails = false;
    this.displayEditUserForm = false;
  }

  refresh():void {
    this.router.navigateByUrl('/home/user-detials', {skipLocationChange : true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  


}
