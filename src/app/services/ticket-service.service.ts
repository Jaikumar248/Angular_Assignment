import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService implements OnInit {

  upDateUser = new BehaviorSubject<boolean>(false);
  upDateTicket = new BehaviorSubject<boolean>(false);
  displayTicketTable = new BehaviorSubject<boolean>(false);
  adminId: any;
  adminVariable: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }

  createTicket(data: any, userId: any) {
    data['userId'] = userId;
    return this.http.post(`http://localhost:8080/tickets?userId=${userId}`, data);
  }

  viewAllUserTicket(userId: any) {
    return this.http.get(`http://localhost:8080/viewAllUserTicket?userId=${userId}`);
  }

  viewAllTickets() {
    return this.http.get('http://localhost:8080/viewAll');
  }

  viewTicket(ticketId: string) {
    return this.http.get(`http://localhost:8080/viewTicket/${ticketId}`);
  }

  updateUserForm() {
    this.upDateUser.next(true);
    this.upDateTicket.next(false);
  }

  showTicketForm() {
    this.upDateTicket.next(true);
    this.upDateUser.next(false);
  }

  showCategories() {
    return this.http.get('http://localhost:8080/getCategory');
  }

  showSubCategories(data: any) {
    return this.http.get(`http://localhost:8080/getSubCategory?categoryId=${data}`);
  }

  showPriority() {
    return this.http.get('http://localhost:8080/getPriority');
  }

  showStatus() {
    return this.http.get('http://localhost:8080/getStatus');
  }

  getAdminDetails() {
    return this.http.get('http://localhost:8080/getAdminList');
  }

  deleteTicket(ticketid: any, adminId: any) {
    return this.http.delete(`http://localhost:8080/deleteTicket?ticketId=${ticketid}&adminId=${adminId}`);
  }

  changeTicketStatus(ticketId: any, adminId: any, status: any, ticketData: any) {
    return this.http.put(`http://localhost:8080/changeStatus?ticketId=${ticketId}&adminId=${adminId}&statusId=${status}`, ticketData)
  }

  changeTicketPriority(ticketId: any, adminId: any, priority: any, ticketData: any) {
    return this.http.put(`http://localhost:8080/changePriority?ticketId=${ticketId}&adminId=${adminId}&priorityId=${priority}`, ticketData);
  }

}
