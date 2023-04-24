import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  loggedInUser: any;
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
  intialPriorityValue: any;
  categoryDesc: any;
  subCategoryDesc: any;
  statusValues: any;
  loggedInUserName: any;
  loggedInUserId: any;
  createdSource: any;
  suggestionsCategory: any;
  suggestionsSubCatagory: any;

  constructor(private router: Router, private ticketService: TicketServiceService, private userService: UserServiceService,
    private location: Location, private messageService: MessageService,) {
  }

  ngOnInit(): void {
    this.viewUserTicket();
    this.ticketTable = true
    this.ticketService.showCategories().subscribe((result) => {
      this.selectCategory = result;
      this.selectCategory = Object.values(result);
    });

    this.subCategories();
    this.refresh();
    this.status = "open";
    this.userService.showTickets.subscribe((result) => {
      this.displayTicketForm = result;
      this.displayTicketTable = false;
    });

    this.loggedInUser = localStorage.getItem('loggedInUser');
    this.loggedInUser = JSON.parse(this.loggedInUser);
    this.loggedInUserName = this.loggedInUser.userName;
    this.loggedInUserId = this.loggedInUser.userId;

    if (localStorage.getItem('admin')) {
      this.createdSource = "admin";
    }

    if (localStorage.getItem('loggedInUser')) {
      this.createdSource = "user";
    }
  }

  // After page refresh this method will reload the current route. 
  refresh(): void {
    this.router.navigateByUrl('/home/createtickets', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  //For Creating a new ticket.
  createTicket(CreateTicket: any) {
    let check = Object.values(this.userService.categories).some((data) => {
      return data === this.selectedCategoryValues;
    });
    let checkSubCategory = Object.values(this.userService.subCategories).some((data) => {
      return data === this.subCategoryDesc;
    });
    if (check && checkSubCategory) {

      let categoryArray = this.userService.categories;
      for (let key in categoryArray) {
        if (categoryArray[key] === CreateTicket.categoryId) {
          CreateTicket.categoryId = this.catageryValue;
          CreateTicket['categoryId'] = key;
        }
      }
      let subCategoryArray = this.userService.subCategories
      for (let key in subCategoryArray) {
        if (subCategoryArray[key] === CreateTicket.subCategoryId) {
          CreateTicket.subCategoryId = key;
        }
      }
      let loggedInUser: any = localStorage.getItem('loggedInUser');
      loggedInUser = JSON.parse(loggedInUser);
      loggedInUser = loggedInUser.userId;
      let index = 1;
      CreateTicket.statusId = index;
      this.ticketService.createTicket(CreateTicket, loggedInUser).subscribe((result) => {
      },
        (error) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'successfully created ticket' });
          this.router.navigate(['/home/viewtickets']);
        }
      );
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'please select only drop down values only' });
    }
  }

  // Fetch all the tickets based on login user.
  viewUserTicket() {
    let loggedInUser: any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser = loggedInUser.userId;
    this.ticketService.viewAllUserTicket(loggedInUser).subscribe((result) => {
      this.allTickets = result;
    });
  }

  //close the ticket form and close the category dialog box on click cancel.
  closeTicketForm() {
    this.displayForm = false;
    this.ticketTable = true;
    this.displayDialog = false;
    this.selectedCategoryValues = '';
  }

  //Search the autocomplete dropdown values in category
  completeCategory(data: any) {
    this.suggestionsCategory = [];
    for (let item of this.selectCategory) {
      if (data === '') {
        this.suggestionsCategory.push(item);
      }
      else {
        if (item.toLowerCase().includes(data.toLowerCase())) {
          this.suggestionsCategory.push(item);
        }
      }
    }
  }

  //Search the autocomplete dropdown values in subcategory.
  completeSubCategory(data: any) {
    this.searchSubCategories(data);
    this.suggestionsSubCatagory = [];
    for (let item of this.selectedSubCatagory) {
      if (data === '') {
        this.suggestionsSubCatagory.push(item);
      }
      else {
        if (item.toLowerCase().includes(data.toLowerCase())) {
          this.suggestionsSubCatagory.push(item);
        }
      }
    }
  }

  //On click add ticket button dialog box will open
  showCategoryDialogBox() {
    this.displayDialog = true;
    this.ticketTable = true;
  }

  // Here checking selected value is dropdown value or not
  selectCategoryValue() {
    let check = Object.values(this.userService.categories).some((data) => {
      return data === this.selectedCategoryValues;
    });
    if (check) {
      this.displayForm = true;
      this.displayDialog = false;
      this.ticketTable = false;
      this.subCategories();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'please select only drop down values only' });
    }
  }

  selectedCategoryValue(event: any) {
    this.selectedCategoryValues = event;
    let value = this.selectedCategoryValues;
    let index = 1;
    for (let item of Object.values(this.userService.categories)) {
      if (item === value) {
        console.log("select item id is " + index);
        this.catageryValue = index;
        this.categoryDesc = event;
        this.subCategory = index;
        localStorage.setItem('catageryValue', JSON.stringify(this.catageryValue));
        break;
      }
      index = index + 1;
    }
    this.subCategoryDesc = '';
    this.searchSubCategories(this.catageryValue);
  }

  dispsubCategory(event: any) {
    this.subCategoryDesc = event;
  }

  //Sub Category dropdown values based on category id
  searchSubCategories(data: any) {
    this.ticketService.showSubCategories(this.catageryValue).subscribe((result) => {
      this.selectedSubCatagory = result;
    });
  }

  // view ticket details in view mode
  viewTicketDetails(item: any) {
    this.router.navigate([`/home/ticketdetails/${item}`]);
  }

  subCategories() {
    let value = localStorage.getItem('catageryValue');
    this.ticketService.showSubCategories(value).subscribe((result) => {
      this.subCatagories = result;
    });
  }

  //Fetching the status values here
  searchStatus(data: any) {
    this.ticketService.showStatus().subscribe((result) => {
      this.statusValues = result;
    });
  }

  //Fetching the priority values here
  searchPriority(data: any) {
    this.ticketService.showPriority().subscribe((result) => {
      this.priorities = result;
    });
  }

}

