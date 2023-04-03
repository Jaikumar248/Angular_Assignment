import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../services/ticket-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit,  DoCheck{
  
  showTicketButton:boolean = true;
  allTickets:any;
  displayTicketForm:boolean = false;
  displayTicketTable:boolean = false;
  displayDialog:boolean = false;
  displayForm:boolean = false;
  loggedInUser1:any;
  selectCategory:any;
  selectedCategoryValues:any;
  catageryValue:any;
  ticketData:any;
  subCatagories:any;
  selectedSubCatagory:any;
  subCategory:any;
  

  constructor(private router:Router, private ticketService:TicketServiceService, private userService: UserServiceService, private activeRoute: ActivatedRoute){
    

  }
  ngDoCheck(): void {
    //this.ViewUserTicket();
  }
  ngOnChanges(changes: SimpleChanges): void {
     //this.ViewUserTicket();
  }

  ngOnInit(): void {
    this.ViewUserTicket();
    this.userService.showTicketsTable.subscribe((result)=>{
    this.displayTicketTable = result;
    this.displayTicketForm = false;
    this.displayForm = false;
    
  });

  this.SubCategories();
  

  this.userService.showTickets.subscribe((result)=>{
    this.displayTicketForm = result;
    this.displayTicketTable = false;
   })


    this.loggedInUser1 = localStorage.getItem('loggedInUser');
    this.loggedInUser1 = JSON.parse(this.loggedInUser1);
    this.loggedInUser1 = this.loggedInUser1.user_id;
    

  }
  
  
  CreateTicket(CreateTicket:any){
    let arr1 = this.userService.categories;
    for (let key in arr1){
      if (arr1[key] === CreateTicket.category_id){
        CreateTicket.category_id = key;
      }
    }

    let arr2 = this.userService.sub_categories
    for (let key in arr2){
      if (arr2[key] === CreateTicket.sub_category_id){
        CreateTicket.sub_category_id = key;
      }
    }
    let loggedInUser:any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser = loggedInUser.user_id;
    this.ticketService.CreateTicket(CreateTicket,loggedInUser).subscribe((result)=>{
      // console.log(result);
      this.ViewUserTicket();
    });
    
    this.displayForm = false;
    this.displayTicketTable = true;
    
  
  }
 ViewUserTicket(){
  
  let loggedInUser:any = localStorage.getItem('loggedInUser');
  loggedInUser = JSON.parse(loggedInUser);
  loggedInUser = loggedInUser.user_id;
  this.ticketService.ViewAllUserTicket(loggedInUser).subscribe((result)=>{
   
    this.allTickets = result;
    
  })
  

 }

 closeTicketForm(){
  this.displayForm = false;
  this.displayTicketForm = true;
  localStorage.clear();
 }

 showDialog(){
  this.displayDialog = true;
  this.displayTicketForm = false;

 }

 DisplayTicketForm(){
  this.displayForm = true;
  this.displayDialog = false;
  this.SubCategories();
 }
 

 search(data:any){
  console.log(data)
  this.ticketService.ShowCategories().subscribe((result)=>{
    this.selectCategory = result;
    // console.log(result);
    this.selectCategory = Object.values(result);
  })
 }

 disp(event:any){
  this.selectedCategoryValues = event;
  console.log(this.selectedCategoryValues);
  let value = this.selectedCategoryValues;
  let index = 1;
  for (let o of Object.values(this.userService.categories)){
   if(o === value){
     console.log("select item id is "+index);
     this.catageryValue = index;
     this.subCategory = index;
     localStorage.setItem('catageryValue', JSON.stringify(this.catageryValue));
     break;
    }
    index = index + 1;
 }

}


searchSubcatageries(){
  // console.log('eoifwniofn')
  this.ticketService.ShowSubCategories(this.catageryValue).subscribe((result)=>{
    console.log(result);
  })
}

viewModel(item:any){
  this.router.navigate([`/home/user-view/${item}`]);
  let ticketId = this.activeRoute.snapshot.paramMap.get('ticket_id');
  ticketId && this.ticketService.ViewTicket(ticketId).subscribe((result)=>{
    this.ticketData = result;
  });
}
closeForm(){
  this.displayTicketTable = true;

}

SubCategories(){
  let value = localStorage.getItem('catageryValue')
  // value = JSON.parse(value);
  console.log(value)
  console.log(this.subCategory);
  this.ticketService.ShowSubCategories(value).subscribe((result)=>{
    console.log(result);

    this.subCatagories = result;
  })
}

}

