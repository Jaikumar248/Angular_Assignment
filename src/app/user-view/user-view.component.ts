import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit{

  ticketData:any;

  constructor(private activeRoute:ActivatedRoute, private ticketService:TicketServiceService, private router:Router){

  }
  ngOnInit(): void {
    let ticketId = this.activeRoute.snapshot.paramMap.get('ticket_id');
    ticketId && this.ticketService.ViewTicket(ticketId).subscribe((result)=>{
      this.ticketData = result;
    });
  }

  closeForm(){
    this.router.navigate(['/home/create-ticket']);
    
  }

  closeViewMode(){
    this.router.navigate(['/home/create-ticket'])
  }

}
