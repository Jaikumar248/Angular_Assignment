import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  showUsers: any;
  showTickets: any;
  showUserTable: boolean = false;
  showTicketTable: boolean = false;
  viewAllTickets: any;
  searchText = '';
  ticket: any;
  adminVariable: any;
  adminId: any;
  ticketData: any;
  ticketView: boolean = false;
  displayPopPriority: boolean = false;
  displayPopStatus: boolean = false;
  selectedStatus: any;
  selectedStatusValue: any;
  selectPriority: any;
  selectedPriorityValues: any;
  adminObject: any;
  adminKeys: any;
  ticketId: any;
  ticketstatusId: any;
  selectedPriorityValue: any;
  seletectPriorities: any;
  getAdmin: any;
  getAdminValue: any;
  adminValue: any;
  selectedAdmin: any;
  userId: any;
  priorities: any;
  suggestionsStatus: any;
  selectedPriorityValueKey: any;
  selectedStatusValueKey: any;

  constructor(private userService: UserServiceService, private ticketService: TicketServiceService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.refresh();
    this.userService.displayUserTable.subscribe((result) => {
      this.showUserTable = result;
      this.showTicketTable = false;
    });
    this.showTicketTable = true;

    this.viewAllTicket();
    this.ticketService.showStatus().subscribe((result) => {
      this.selectedStatus = result;
    });
    this.ticketService.showPriority().subscribe((result) => {
      this.seletectPriorities = result;
    });
  }

  //Fetching all tickets here
  viewAllTicket() {
    this.ticketService.viewAllTickets().subscribe((result) => {
      this.viewAllTickets = result;
    });
  }

  //Fetch the ticket details based on ticket id
  viewTicketById() {
    this.ticket;
    if (this.ticket == '') {
      this.ticketService.viewAllTickets().subscribe((result) => {
        this.viewAllTickets = result;
      });
    }
    this.ticketService.viewTicket(this.ticket).subscribe(
      result => {
        this.viewAllTickets = [];
        this.viewAllTickets.push(result);
      },
      error => {
        this.viewAllTickets = [];
      });
  }

  //Delete ticket 
  deleteTicket(data: any) {
    let adminId = localStorage.getItem('admin');
    adminId = adminId && JSON.parse(adminId);
    let admin: any = adminId;
    admin = admin.userId;
    this.confirmationService.confirm({
      message: 'Are you sure To Delete Selected Object? Click Yes To Delete',
      accept: () => {
        this.ticketService.deleteTicket(data, admin).subscribe((result) => {
          this.viewAllTicket();
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Deleted Successful' });
        },
          error => {
            this.viewAllTicket();
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Deleted Successful' });
          }
        );
      }
    });
  }

  //On double click in the table we can see ticket in view mode.
  ticketviewMode(item: any) {
    this.ticketData = item;
    this.ticketId = item.ticketId;
    this.userId = item.userId;
    this.ticketstatusId = item.status;
    this.ticketView = true;
    this.showTicketTable = false;
  }

  //On click cancel button it will close the ticket view mode
  closeViewMode() {
    this.ticketView = false;
    this.showTicketTable = true;
  }

  //On click changePriority button it will open the change priority dialog box
  changePriorityButton() {
    if (this.ticketstatusId === 'Completed') {
      this.displayPopPriority = false;
      this.ticketView = true;
      this.messageService.add({ severity: 'warn', summary: 'error', detail: 'this ticket is already assigned you cannot change the priority now' });
    }
    else {
      this.displayPopPriority = true;
      this.ticketView = true;
    }
  }

  //On click changeStatus button it will open the change status dialog box
  changeStatusButton() {
    if (this.ticketstatusId === 'Completed') {
      this.displayPopStatus = false;
      this.messageService.add({ severity: 'warn', summary: 'error', detail: 'this ticket is completed you cannot change the status now' });
      this.ticketView = true;
    }
    else {
      this.displayPopStatus = true;
      this.ticketView = true;
    }
  }

  //Search the autocomplete dropdown values in priority
  completePriority(data: any) {
    this.priorities = [];
    for (let item of this.seletectPriorities) {
      if (data === '') {
        this.priorities.push(item);
      }
      else {
        if (item.toLowerCase().includes(data.toLowerCase())) {
          this.priorities.push(item);
        }
      }
    }
  }

  //Search the autocomplete dropdown values in status.
  completeStatus(data: any) {
    this.suggestionsStatus = [];
    for (let item of this.selectedStatus) {
      if (data === '') {
        this.suggestionsStatus.push(item);
      }
      else {
        if (item.toLowerCase().includes(data.toLowerCase())) {
          this.suggestionsStatus.push(item);
        }
      }
    }
  }

  //close the status dialog box
  closeStatusPop() {
    this.displayPopStatus = false;
    this.ticketView = true;
    this.selectedStatusValue = '';
  }

  // Close the priority dialog box.
  closePriority() {
    this.displayPopPriority = false;
    this.ticketView = true;
    this.selectedPriorityValue = "";
  }

  //Selected value from the autocomplete status dropdown.
  displayStatusValue(event: any) {
    this.selectedStatusValue = event;
    let value = this.selectedStatusValue;
    let index = 1;
    for (let o of Object.values(this.userService.status)) {
      if (o === value) {
        this.selectedPriorityValueKey = index;
        break;
      }
      index = index + 1;
      this.selectedStatusValue = event;
    }
  }

  //Selected value from the autocomplete priority dropdown.
  displayPriorityValue(event: any) {
    this.selectedPriorityValue = event;
    let value = this.selectedPriorityValue;
    let index = 1;
    for (let o of Object.values(this.userService.priority)) {
      if (o === value) {
        this.selectedPriorityValueKey = index;
        break;
      }
      index = index + 1;
      this.selectedPriorityValue = event;
    }
  }

  //Changing the Status of the ticket.
  saveStatus() {
    let check = Object.values(this.userService.status).some((data) => {
      return data === this.selectedStatusValue;
    });
    if (check) {
      let adminId = localStorage.getItem('admin');
      adminId = adminId && JSON.parse(adminId);
      let admin: any = adminId;
      admin = admin.userId;
      if (localStorage.getItem('admin')) {
        this.ticketData.modifiedSource = "admin";
        this.ticketData.modifiedSourceType = "admin";
      }
      this.ticketService.changeTicketStatus(this.ticketId, admin, this.selectedPriorityValueKey, this.ticketData).subscribe((result) => {

      }, (error) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'changed the Status' });
        this.viewAllTicket();
      });
      this.selectedStatusValue = "";
      this.displayPopStatus = false;
      this.showTicketTable = true;
      this.ticketView = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'please select only drop down values only' });
      this.selectedStatusValue = "";
    }
  }

  //Changing the Priority of the ticket.
  savePriority() {
    let check = Object.values(this.userService.priority).some((data) => {
      return data === this.selectedPriorityValue;
    });
    if (check) {
      let adminId = localStorage.getItem('admin');
      adminId = adminId && JSON.parse(adminId);
      let admin: any = adminId;
      admin = admin.userId;
      if (this.ticketstatusId != "open") {
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'This ticket is not in open state' });
      }
      else {
        this.ticketService.changeTicketPriority(this.ticketId, admin, this.selectedPriorityValueKey, this.ticketData).subscribe((result) => {
        }, (error) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'changed the priority' });
          this.viewAllTicket();
        });
      }
      this.selectedPriorityValue = "";
      this.displayPopPriority = false;
      this.showTicketTable = true;
      this.ticketView = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'please select only drop down values only' });
      this.selectedPriorityValue = "";
    }
  }

  //After page refresh this method will reload the current route. 
  refresh(): void {
    this.router.navigateByUrl('/home/ticketdetails', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}
