import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  ticketData: any;

  constructor(private activeRoute: ActivatedRoute, private ticketService: TicketServiceService, private router: Router, private location: Location) {

  }

  ngOnInit(): void {
    let ticketId = this.activeRoute.snapshot.paramMap.get('ticket_id');
    ticketId && this.ticketService.ViewTicket(ticketId).subscribe((result) => {
      this.ticketData = result;
    });
    this.refresh();
  }

  closeViewMode() {
    this.router.navigate(['/home/createTicket']);
  }

  refresh(): void {
    this.router.navigateByUrl('/home/userView/this.ticketData ', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}
