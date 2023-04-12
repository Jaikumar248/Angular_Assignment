import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';
import { SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, OnChanges {


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
  selectedStatus: SelectItem[] = [];
  selectedStatusValue: any;
  selectPriority: any;
  selectedPriorityValues: any;
  adminObject: any;
  adminKeys: any;
  ticketId: any;
  ticketstatusId: any;
  selectedPriorityValue: any;
  seletectPriorities: any;
  setAssignee: boolean = false;
  getAdmin: any;
  getAdminValue: any;
  adminValue: any;
  selectedAdmin: any;
  userId: any;
  seletectPriorities1:any;
 
  constructor(private userService: UserServiceService, private ticketService: TicketServiceService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private activeRoute: ActivatedRoute, 
    private location:Location) {

  }
@ViewChild('status') 'statusvalue1': NgForm;
  ngOnChanges(changes: SimpleChanges): void {
    this.userService.displayUserTable.subscribe((result) => {
      this.showUserTable = result;
      this.showTicketTable = false;
    })

  }
  ngOnInit(): void {
    this.refresh();
    this.userService.displayUserTable.subscribe((result) => {
      this.showUserTable = result;
      this.showTicketTable = false;
    })
    this.showTicketTable = true;

    // this.ticketService.displayTicketTable.subscribe((result) => {
    //   this.showTicketTable = result;
    //   this.showUserTable = false;
    // })
  
    this.ViewAllTicket();


    this.ticketService.ShowStatus().subscribe((result) => {
      this.selectedStatus = Object.values(result);
    });

    this.ticketService.ShowPriority().subscribe((result) => {
      this.seletectPriorities =result;
    })


  }
  ViewAllTicket() {
    this.ticketService.ViewAllTickets().subscribe((result) => {
      this.viewAllTickets = result;
      console.log(this.viewAllTickets);
    })
  }



  AddUsers() {
    this.router.navigate(['/users-home']);

  }

  upDateTicket() {
    this.ticketService.ShowTicketForm();
  }
  ViewTicketById() {
    this.ticket;
    if (this.ticket == '') {
      this.ticketService.ViewAllTickets().subscribe((result) => {
        this.viewAllTickets = result;
      })
    }

    this.ticketService.ViewTicket(this.ticket).subscribe(
      result => {
        console.log(result)
        this.viewAllTickets = [];
        this.viewAllTickets.push(result);

      },
      error => {
        this.viewAllTickets = [];
      });

  }
  DeleteTicket(data: any) {
    console.log(data);
    this.adminVariable = localStorage.getItem('admin');
    this.adminVariable = JSON.parse(this.adminVariable);
    let vara2 = Object.keys(this.adminVariable);
    this.adminId = vara2.toString();


    this.confirmationService.confirm({
      message: 'Are you sure To Delete Selected Object? Click Yes To Delete',
      accept: () => {
        this.ticketService.DeleteTicket(data, this.adminId).subscribe((result) => {
          this.ViewAllTicket();
          // this.DeleteUserMethod();
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Deleted Successful' });

        },

          error => {
            this.ViewAllTicket();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });

          }
        )
      }
    })

  }

  TicketviewMode(item: any) {
    console.log(item);
    this.ticketData = item;
    this.ticketId = item.ticket_id;
    this.userId = item.user_id;
    this.ticketstatusId = item.status;
    this.ticketView = true;
    this.showTicketTable = false;
  }

  closeViewMode() {
    this.ticketView = false;
    this.showTicketTable = true;
  }

  ChangePriority() {
    this.displayPopPriority = true;
    this.ticketView = true;
   
  }

  ChangeStatus1() {
    this.displayPopStatus = true;
    this.ticketView = true;
  }

  ChangeStatus(data: any) {
   
    this.ticketService.ShowStatus().subscribe((result) => {
      this.selectedStatus = Object.values(result);
    });
  }

  completePriority(data:any){
    this.seletectPriorities1 = [];
    for(let item of this.seletectPriorities){
      if(data === ''){
        this.seletectPriorities1.push(item)
      }
      else {
        if(item.toLowerCase().includes(data.toLowerCase())){
          this.seletectPriorities1.push(item);
        }
      }
    }
  }
  ChangePriority1(event: any) {
    this.ticketService.ShowPriority().subscribe((result) => {
      this.seletectPriorities = result;
    })

    // this.seletectPriorities = this.userService.priority;
    // this.seletectPriorities = Object.values(this.seletectPriorities);
    // console.log(this.seletectPriorities);
    // this.seletectPriorities = this.seletectPriorities.filter((c: any) => c.startsWith(event.query))

    // this.ticketService.ShowPriority().subscribe((result) => {
    //   this.seletectPriorities =result;
    // })
    // let filtered: any[] = [];
    // let query = event.query;

    // for(let i = 0; i < array.length; i++){
    //   let priority1 = array[i];
    //   if (priority1.toLowerCase().indexOf(query.toLowerCase())==0){
    //     filtered.push(priority1);
    //   }
    // }

    // this.seletectPriorities = filtered;

  }

  closeStatusPop() {
    this.displayPopStatus = false;
    this.ticketView = true;
    
  }

  closePriority() {
    this.displayPopPriority = false;
    this.ticketView = true;
    
  }
  closeSetAssignee() {
    this.setAssignee = false;
    this.ticketView = true;

  }
 

  displayStatusValue(event: any) {
    this.selectedStatusValue = event;
    let value = this.selectedStatusValue;
    let index = 1;
    for (let o of Object.values(this.userService.status)) {
      if (o === value) {
        console.log("select status id is " + index);
        break;
      }
      index = index + 1;
      this.selectedStatusValue = index;
      // console.log( this.selectedStatusValue);
    }
  }

  displayPriorityValue(event: any) {
    this.selectedPriorityValue = event;
    let value = this.selectedPriorityValue;
    console.log(value)
    let index = 1;
    for (let o of Object.values(this.userService.priority)) {
      if (o === value) {
        console.log("selected priority is " + index)
        break;
      }
      index = index + 1;
      this.selectedPriorityValue = index;
    }
  }

  saveStatus() {
    this.ticketService.GetAdminDetails().subscribe((result) => {

      this.adminObject = result;
      let vara = Object.keys(result)
      this.adminKeys = vara.toString();
      if(localStorage.getItem('admin')){
        this.ticketData.modifiedSource = "admin";
        this.ticketData.modifiedSourceType = "admin";
      }
      console.log(this.ticketData);
      this.ticketService.ChangeTicketStatus(this.ticketId, this.adminKeys, this.selectedStatusValue, this.ticketData).subscribe((result) => {
       
      }, (error)=>{
        this.ViewAllTicket();
      });
    });

    this.displayPopStatus = false;
    this.showTicketTable = true;
    this.ticketView = false;
  }


  savePriority() {
    console.log(this.ticketstatusId);
    this.ticketService.GetAdminDetails().subscribe((result) => {
      this.adminObject = result;
      let vara = Object.keys(result)
      this.adminKeys = vara.toString();
      console.log(this.adminKeys);
      if (this.ticketstatusId != "open") {
        alert("This ticket is not in open state")
      }
      else {
        console.log(this.ticketId, Number(this.adminKeys) ,this.selectedPriorityValue);
        this.ticketService.ChangeTicketPriority(this.ticketId, this.adminKeys, this.selectedPriorityValue, this.ticketData).subscribe((result) => {
          
        },(error)=>{
          this.ViewAllTicket();
        })
       
      }
      this.displayPopPriority = false;
      this.showTicketTable = true;
      this.ticketView = false;
    })


  }

  SetAssignee() {
    this.setAssignee = true;
    this.ticketView = false;
  }

  SetAssigneeSave(data: any) {
    this.ticketService.GetAdminDetails().subscribe((result) => {
      this.getAdmin = result
      this.adminValue = Object.values(result)

    })
  }

  displayAdminValue(event: any) {
    this.selectedAdmin = event;
  }

  saveAssignee() {
    for (let key in this.getAdmin) {
      if (this.getAdmin[key] === this.selectedAdmin) {
        console.log(key);
        this.ticketService.SetAssignee(key, this.ticketId, this.userId).subscribe(success => {
        },(error)=>{
          this.ViewAllTicket();
        })
      }
      this.setAssignee = false;
      this.showTicketTable = true;
    }   

  }

  refresh():void {
    this.router.navigateByUrl('/home/admin-home', {skipLocationChange : true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}
