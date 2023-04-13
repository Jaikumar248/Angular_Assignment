import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private router:Router, private userService:UserServiceService, private ticketService:TicketServiceService){

  }
  
  ngOnInit(): any {
   
  }

 
}
