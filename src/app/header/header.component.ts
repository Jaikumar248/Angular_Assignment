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
 
  showUserTable:boolean = false;
  constructor(private router:Router, private userService:UserServiceService, private ticketService:TicketServiceService){

  }
  ngOnInit(): any {
    
    this.homeContent();

    if(localStorage.getItem('admin')){
      this.mainHeader = true;
    }
    if(localStorage.getItem('loggedInUser')){
      this.mainHeader = false;
    }
  }
 
  Logout(){
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('admin');
    this.router.navigate(['']); 
  }

  homeContent(){
    this.router.navigate(['/home/message']);
  }

}
