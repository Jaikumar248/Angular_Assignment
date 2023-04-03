import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  mainHeader:any;
  headers1:boolean = false;
  headers2:boolean = false;
  menuType:string = 'default';
  

  showUserTable:boolean = false;
  constructor(private router:Router, private userService:UserServiceService, private ticketService:TicketServiceService){

  }
  ngOnInit(): any {
    // if(localStorage.getItem('loggedInUser')){
    //   this.navbarDisplayUser = true;
      
    //   this.userService.ReloadData();
    // }
    // if(localStorage.getItem('admin')){
    //   this.navbarDisplayAdmin = true;
    //   this.userService.ReloadToAdmin();
     
    // }

    // this.router.events.subscribe((val:any)=>{
    //   if(val.url){
    //     if(localStorage.getItem('admin') && val.url.includes('admin-home')){
    //       this.menuType = 'admin';
    //     }
    //     if(localStorage.getItem('loggedInUser') && val.url.includes('create-ticket')){
    //       this.menuType = 'user';
    //     }
    //   }
    // })
    this.homeContent();

    if(localStorage.getItem('admin')){
      this.mainHeader = true;
    }
    if(localStorage.getItem('loggedInUser')){
      this.mainHeader = false;
    }

  }
 

  ShowAllUsers(){
    this.userService.ShowUsersInAdmin();
   

  }
  ShowTickets(){
    this.ticketService.ShowTicketsAdmin();
    
  }
  AddUsers(){
    this.userService.AddUsers();
    
  }




  Logout(){
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('admin');
    this.router.navigate(['']);
    this.headers1 = true;
    

  }

  // LogoutAdmin(){
    
  //   this.router.navigate(['']);
  //   this.headers2 = true;
   
  // }

  showTicketForm(){
    this.userService.ShowTickets();
  }

  showTicketTable(){
    this.userService.ShowTicketsTable();
  }

  homeContent(){
    this.router.navigate(['/home/message']);
  }



}
