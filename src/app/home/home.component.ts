import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  mainHeader:any;
  headers1:boolean = false;
  headers2:boolean = false;
  menuType:string = 'default';
  staticMessage!:boolean ;

  showUserTable:boolean = false;
  constructor(private router:Router, private userService:UserServiceService, private ticketService:TicketServiceService){

  }
  ngOnChanges(): void {
    this.staticMessage = this.userService.staticMessage;
  }
  ngOnInit(): any {
    this.staticMessage = this.userService.staticMessage;
  }

  ShowUsers(){
    this.userService.ShowUsersInAdmin();
    
  }
  ShowTickets(){
    this.ticketService.ShowTicketsAdmin();
    
  }
  AddUsers(){
    this.router.navigate(['/users-home']);

  }




  Logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['']);
    this.headers1 = true;
    

  }

  LogoutAdmin(){
    localStorage.removeItem('admin');
    this.router.navigate(['']);
    this.headers2 = true;
   
  }
}
