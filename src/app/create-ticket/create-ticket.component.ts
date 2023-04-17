import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  allTickets: any;
  displayTicketForm: boolean = false;
  displayTicketTable: boolean = false;
  displayDialog: boolean = false;
  displayForm: boolean = false;
  loggedInUser1: any;
  selectCategory: any;
  selectedCategoryValues: any;
  catageryValue: any;
  ticketData: any;
  subCatagories: any;
  selectedSubCatagory: any;
  subCategory: any;
  status: any;
  selectedStatus: any;
  priorities: any;
  selectedPriority: any;
  ticketTable: boolean = false;
  intialPriorityValue = null;
  category_desc: any;
  sub_category_desc: any;
  selectedStatus1: any;
  status1: any;
  loggedInUserName: any;
  loggedInUser2: any;
  createdSource: any;
  selectCategory1: any;
  selectedSubCatagory1: any;

  constructor(private router: Router, private ticketService: TicketServiceService, private userService: UserServiceService, private activeRoute: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.ViewUserTicket();
    this.ticketTable = true
    this.ticketService.ShowCategories().subscribe((result) => {
      this.selectCategory = result;
      this.selectCategory = Object.values(result);
    })

    this.SubCategories();
    this.refresh();
    this.status = "open";
    this.userService.showTickets.subscribe((result) => {
      this.displayTicketForm = result;
      this.displayTicketTable = false;
    })

    this.loggedInUser1 = localStorage.getItem('loggedInUser');
    this.loggedInUser1 = JSON.parse(this.loggedInUser1);
    this.loggedInUserName = this.loggedInUser1.userName;
    this.loggedInUser1 = this.loggedInUser1.user_id;

    if (localStorage.getItem('admin')) {
      this.createdSource = "admin";
    }

    if (localStorage.getItem('loggedInUser')) {
      this.createdSource = "user";
    }
  }

  refresh(): void {
    this.router.navigateByUrl('/home/create-ticket', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  CreateTicket(CreateTicket: any) {
    let arr1 = this.userService.categories;
    for (let key in arr1) {
      if (arr1[key] === CreateTicket.category_id) {
        CreateTicket.category_id = this.catageryValue;
        CreateTicket['category_id'] = key;
      }
    }

    let arr2 = this.userService.sub_categories
    for (let key in arr2) {
      if (arr2[key] === CreateTicket.sub_category_id) {
        CreateTicket.sub_category_id = key;
      }
    }

    let loggedInUser: any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser = loggedInUser.user_id;
    let index = 1;
    CreateTicket.status_id = index;
    console.log(CreateTicket)
    this.ticketService.CreateTicket(CreateTicket, loggedInUser).subscribe((result) => {
    },
      (error) => {
        this.router.navigate(['/home/view-ticket']);
      }
    );
  }

  ViewUserTicket() {
    let loggedInUser: any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser = loggedInUser.user_id;
    this.ticketService.ViewAllUserTicket(loggedInUser).subscribe((result) => {
      this.allTickets = result;
    })
  }

  closeTicketForm() {
    this.displayForm = false;
    this.ticketTable = true;
    this.displayDialog = false;
    this.selectedCategoryValues = '';
  }

  CloseTicketPop() {
    this.displayDialog = false;
    this.ticketTable = true;
    this.ViewUserTicket();
    this.displayForm = false;
  }

  completeCategory(data: any) {
    this.selectCategory1 = [];
    for (let item of this.selectCategory) {
      if (data === '') {
        this.selectCategory1.push(item);
      }
      else {
        if (item.toLowerCase().includes(data.toLowerCase())) {
          this.selectCategory1.push(item);
        }
      }
    }
  }

  completeSubCategory(data: any) {
    this.searchSubCategories(data);
    this.selectedSubCatagory1 = [];
    for (let item of this.selectedSubCatagory) {
      if (data === '') {
        this.selectedSubCatagory1.push(item);
      }
      else {
        if (item.toLowerCase().includes(data.toLowerCase())) {
          this.selectedSubCatagory1.push(item);
        }
      }
    }
  }

  ShowCategoryDialogBox() {
    this.displayDialog = true;
    this.ticketTable = true;
  }

  SelectCategoryValue() {
    this.displayForm = true;
    this.displayDialog = false;
    this.ticketTable = false;
    this.SubCategories();
  }

  SelectedCategoryValue(event: any) {
    this.selectedCategoryValues = event;
    console.log(this.selectedCategoryValues);
    let value = this.selectedCategoryValues;
    let index = 1;
    for (let o of Object.values(this.userService.categories)) {
      if (o === value) {
        console.log("select item id is " + index);
        this.catageryValue = index;
        this.category_desc = event;
        this.subCategory = index;
        localStorage.setItem('catageryValue', JSON.stringify(this.catageryValue));
        break;
      }
      index = index + 1;
    }
    this.sub_category_desc = '';
    this.searchSubCategories(this.catageryValue);
  }

  dispsubCategory(event: any) {
    this.sub_category_desc = event;
  }

  searchSubCategories(data: any) {
    this.ticketService.ShowSubCategories(this.catageryValue).subscribe((result) => {
      this.selectedSubCatagory = result;
    });
  }

  viewTicketDetails(item: any) {
    this.router.navigate([`/home/user-view/${item}`]);
    let ticketId = this.activeRoute.snapshot.paramMap.get('ticket_id');
    ticketId && this.ticketService.ViewTicket(ticketId).subscribe((result) => {
      this.ticketData = result;
    });
  }

  SubCategories() {
    let value = localStorage.getItem('catageryValue');
    this.ticketService.ShowSubCategories(value).subscribe((result) => {
      this.subCatagories = result;
    });
  }

  searchStatus(data: any) {
    this.ticketService.ShowStatus().subscribe((result) => {
      this.status1 = result;
    });
  }

  searchPriority(data: any) {
    this.ticketService.ShowPriority().subscribe((result) => {
      this.priorities = result;
    });
  }

}

