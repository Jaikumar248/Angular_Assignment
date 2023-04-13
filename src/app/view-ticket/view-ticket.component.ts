import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {


  allTickets: any;
  ticketData: any;
  constructor(private ticketService: TicketServiceService, private router: Router, private activeRoute: ActivatedRoute,
    private location: Location) { }
  ngOnInit(): void {
    this.ViewUserTicket();
    this.refresh();
  }



  ViewUserTicket() {
    let loggedInUser: any = localStorage.getItem('loggedInUser');
    console.log(loggedInUser)
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser = loggedInUser.user_id;
    this.ticketService.ViewAllUserTicket(loggedInUser).subscribe((result) => {
      this.allTickets = result;
    })
  }

  TicketViewMode(item: any) {
    this.router.navigate([`/home/user-view/${item}`]);
    let ticketId = this.activeRoute.snapshot.paramMap.get('ticket_id');
    ticketId && this.ticketService.ViewTicket(ticketId).subscribe((result) => {
      this.ticketData = result;
    });
  }

  refresh(): void {
    this.router.navigateByUrl('/home/view-ticket', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}

