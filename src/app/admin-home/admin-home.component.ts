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
  selectedStatus:any;
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
  seletectPriorities1:any;
  selectedStatus1:any;
  selectedPriorityValue1:any;
  selectedStatusValue1:any;


  constructor(private userService: UserServiceService, private ticketService: TicketServiceService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private activeRoute: ActivatedRoute, 
    private location:Location) {
  }

  ngOnInit(): void {
    this.refresh();
    this.userService.displayUserTable.subscribe((result) => {
      this.showUserTable = result;
      this.showTicketTable = false;
    })
    this.showTicketTable = true;  
  
    this.ViewAllTicket();
    this.ticketService.ShowStatus().subscribe((result) => {
      this.selectedStatus = result;
    });
    this.ticketService.ShowPriority().subscribe((result) => {
      this.seletectPriorities =result;
    })
  }

  //Fetching all tickets here
  ViewAllTicket() {
    this.ticketService.ViewAllTickets().subscribe((result) => {
      this.viewAllTickets = result;
    });
  }

  //Fetch the ticket details based on ticket id
  ViewTicketById() {
    this.ticket;
    if (this.ticket == '') {
      this.ticketService.ViewAllTickets().subscribe((result) => {
        this.viewAllTickets = result;
      });
    }
    this.ticketService.ViewTicket(this.ticket).subscribe(
      result => {
        this.viewAllTickets = [];
        this.viewAllTickets.push(result);
      },
      error => {
        this.viewAllTickets = [];
      });
  }

  //Delete ticket 
  DeleteTicket(data: any) {
      let adminId = localStorage.getItem('admin');
      adminId = adminId && JSON.parse(adminId);
      console.log(typeof(adminId));
      let admin : any = adminId;
      admin = admin.user_id;
    this.confirmationService.confirm({
      message: 'Are you sure To Delete Selected Object? Click Yes To Delete',
      accept: () => {
        this.ticketService.DeleteTicket(data, admin).subscribe((result) => {
          this.ViewAllTicket(); 
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Deleted Successful' });
        },
          error => {
            this.ViewAllTicket();
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Deleted Successful' });
          }
        );
      }
    });
  }

  //On double click in the table we can see ticket in view mode.
  TicketviewMode(item: any) {
    this.ticketData = item;
    this.ticketId = item.ticket_id;
    this.userId = item.user_id;
    this.ticketstatusId = item.status;
    this.ticketView = true;
    this.showTicketTable = false;
  }

  //On click cancel button it will close the ticket view mode
  CloseViewMode() {
    this.ticketView = false;
    this.showTicketTable = true;
  }

  //On click changePriority button it will open the change priority dialog box
  ChangePriorityButton() {
    this.displayPopPriority = true;
    this.ticketView = true;
  }

  //On click changeStatus button it will open the change status dialog box
  ChangeStatusButton() {
    this.displayPopStatus = true;
    this.ticketView = true;
  }

  ChangeStatus(data: any) { 
    this.ticketService.ShowStatus().subscribe((result) => {
      this.selectedStatus = result;
    });
  }

  //Search the autocomplete dropdown values in priority
  completePriority(data:any){
    this.seletectPriorities1 = [];
    for(let item of this.seletectPriorities){
      if(data === ''){
        this.seletectPriorities1.push(item);
      }
      else {
        if(item.toLowerCase().includes(data.toLowerCase())){
          this.seletectPriorities1.push(item);
        }
      }
    }
  }

  //Search the autocomplete dropdown values in status.
  completeStatus(data:any){
    this.selectedStatus1 = [];
    for(let item of this.selectedStatus){
      if(data === ''){
        this.selectedStatus1.push(item);
      }
      else {
        if(item.toLowerCase().includes(data.toLowerCase())){
          this.selectedStatus1.push(item);
        }
      }
    }
  }

  ChangePriority1(event: any) {
    this.ticketService.ShowPriority().subscribe((result) => {
      this.seletectPriorities = result;
    });
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
        break;
      }
      index = index + 1;
      this.selectedStatusValue1 = index;
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
        this.selectedPriorityValue1 = index;
        break;
      }
      index = index + 1;
      this.selectedPriorityValue = event;
    }
  }

  //Changing the Status of the ticket.
  saveStatus() {
      let adminId = localStorage.getItem('admin');
      adminId = adminId && JSON.parse(adminId);
      console.log(typeof(adminId));
      let admin : any = adminId;
      admin = admin.user_id;
      if(localStorage.getItem('admin')){
        this.ticketData.modifiedSource = "admin";
        this.ticketData.modifiedSourceType = "admin";
      }
      this.ticketService.ChangeTicketStatus(this.ticketId, admin, this.selectedStatusValue1, this.ticketData).subscribe((result) => {
       
      }, (error)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'changed the Status' });
        this.ViewAllTicket();
      });
    this.selectedStatusValue = "";
    this.displayPopStatus = false;
    this.showTicketTable = true;
    this.ticketView = false;
  }

  //Changing the Priority of the ticket.
  savePriority() {
      let adminId = localStorage.getItem('admin');
      adminId = adminId && JSON.parse(adminId);
      let admin : any = adminId;
      admin = admin.user_id;
      if (this.ticketstatusId != "open") {
        alert("This ticket is not in open state");
      }
      else {
        this.ticketService.ChangeTicketPriority(this.ticketId, admin, this.selectedPriorityValue1, this.ticketData).subscribe((result) => { 
        },(error)=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'changed the priority' });
          this.ViewAllTicket();
        }) 
      }
      this.selectedPriorityValue = "";
      this.displayPopPriority = false;
      this.showTicketTable = true;
      this.ticketView = false;
  }

  //After page refresh this method will reload the current route. 
  refresh():void {
    this.router.navigateByUrl('/home/adminHome', {skipLocationChange : true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}
