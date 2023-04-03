import { Component, OnInit } from '@angular/core';
import { TicketServiceService } from '../services/ticket-service.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit{
  toggleUserForm:any;
  toggleTicketForm:any;
  selectedValues:any;
  selectedCategories:any;
  constructor(private ticketService:TicketServiceService){}
  ngOnInit(): void {
   this.toggleUserForm = this.ticketService.upDateUser.value;
    this.toggleTicketForm = this.ticketService.upDateTicket.value;
    this.SearchStatus();
    this.SearchPriority();
  }
  search(selectedValues:Event){
    this.ticketService.ShowCategories().subscribe((result)=>{
      this.selectedCategories = result;
    })
  }
  SearchSubCategaries(){
    this.ticketService.ShowSubCategories(this.selectedValues);
  }
  disp(event:any){
    
    this.selectedValues = event;
    console.log(this.selectedValues)

  }

  SearchPriority(){
    this.ticketService.ShowPriority().subscribe((result)=>{
      console.log(result);
    })
  }
  SearchStatus(){
    this.ticketService.ShowStatus().subscribe((result)=>{
      console.log(result);
    })
  }

}
