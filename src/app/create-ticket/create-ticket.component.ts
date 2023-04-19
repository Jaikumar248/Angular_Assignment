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
  CategoryValue:any;

  constructor(private router: Router, private ticketService: TicketServiceService, private userService: UserServiceService, private activeRoute: ActivatedRoute,
    private location: Location, private confirmationService: ConfirmationService, private messageService: MessageService,) {
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

  // After page refresh this method will reload the current route. 
  refresh(): void {
    this.router.navigateByUrl('/home/createTicket', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  //For Creating a new ticket
  CreateTicket(CreateTicket: any) {
    let check = Object.values(this.userService.categories).some((data)=>{
      return data === this.selectedCategoryValues;
    })
    let checkSubCategory =  Object.values(this.userService.sub_categories).some((data)=>{
      return data === this.sub_category_desc;
    }) 
    if(check && checkSubCategory){
      
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
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'successfully created ticket' });
        this.router.navigate(['/home/viewTicket']);
      }
    );
    }
    else {
      alert("please select only dropdown values");
    }
  }

  // Fetch all the tickets based on login user
  ViewUserTicket() {
    let loggedInUser: any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser = loggedInUser.user_id;
    this.ticketService.ViewAllUserTicket(loggedInUser).subscribe((result) => {
      this.allTickets = result;
    })
  }

  // close the ticket form and close the category dialog box on click cancel
  closeTicketForm() {
    this.displayForm = false;
    this.ticketTable = true;
    this.displayDialog = false;
    this.selectedCategoryValues = '';
  }

  // CloseTicketPop() {
  //   this.displayDialog = false;
  //   this.ticketTable = true;
  //   this.ViewUserTicket();
  //   this.displayForm = false;
  // }

  //Search the autocomplete dropdown values in category
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

  //Search the autocomplete dropdown values in subcategory.
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

  //On click add ticket button dialog box will open
  ShowCategoryDialogBox() {
    this.displayDialog = true;
    this.ticketTable = true;
  }

  // Here checking selected value is dropdown value or not
  SelectCategoryValue() {
    let check = Object.values(this.userService.categories).some((data)=>{
      return data===this.selectedCategoryValues;
    })
    if(check){
          this.displayForm = true;
          this.displayDialog = false;
          this.ticketTable = false;
          this.SubCategories();
    }else{
      alert("please select only dropdown values only");
    }
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

  //Sub Category dropdown values based on category id
  searchSubCategories(data: any) {
    this.ticketService.ShowSubCategories(this.catageryValue).subscribe((result) => {
      this.selectedSubCatagory = result;
    });
  }

  // view ticket details in view mode
  viewTicketDetails(item: any) {
    this.router.navigate([`/home/userView/${item}`]);
  }

  SubCategories() {
    let value = localStorage.getItem('catageryValue');
    this.ticketService.ShowSubCategories(value).subscribe((result) => {
      this.subCatagories = result;
    });
  }

  //Fetching the status values here
  searchStatus(data: any) {
    this.ticketService.ShowStatus().subscribe((result) => {
      this.status1 = result;
    });
  }

  //Fetching the priority values here
  searchPriority(data: any) {
    this.ticketService.ShowPriority().subscribe((result) => {
      this.priorities = result;
    });
  }

}

