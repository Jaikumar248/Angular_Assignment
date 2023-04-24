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
    this.viewUserTicket();
    this.refresh();
  }

  viewUserTicket() {
    let loggedInUser: any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser = loggedInUser.userId;
    this.ticketService.viewAllUserTicket(loggedInUser).subscribe((result) => {
      this.allTickets = result;
    });
  }

  ticketViewMode(item: any) {
    this.router.navigate([`/home/ticketdetails/${item}`]);
    let ticketId = this.activeRoute.snapshot.paramMap.get('ticketId');
    ticketId && this.ticketService.viewTicket(ticketId).subscribe((result) => {
      this.ticketData = result;
    });
  }

  //After page refresh this method will reload the current route.
  refresh(): void {
    this.router.navigateByUrl('/home/viewtickets', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}

