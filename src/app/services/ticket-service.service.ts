import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {

  }

  CreateTicket(data: any, user_id: any) {
    data['user_user_id'] = user_id;
    return this.http.post(`http://localhost:8080/tickets?user_id=${user_id}`, data);
  }

  ViewAllUserTicket(user_id: any) {
    return this.http.get(`http://localhost:8080/viewAllUserTicket?user_id=${user_id}`);
  }

  ViewAllTickets() {
    return this.http.get('http://localhost:8080/viewAll');
  }

  ViewTicket(ticket_id: string) {
    return this.http.get(`http://localhost:8080/viewTicket/${ticket_id}`);
  }

  UpdateUserForm() {
    this.upDateUser.next(true);
    this.upDateTicket.next(false);
  }

  ShowTicketForm() {
    this.upDateTicket.next(true);
    this.upDateUser.next(false);
  }

  ShowCategories() {
    return this.http.get('http://localhost:8080/getCategory');
  }

  ShowSubCategories(data: any) {
    return this.http.get(`http://localhost:8080/getSubCategory?category_id=${data}`);
  }

  ShowPriority() {
    return this.http.get('http://localhost:8080/getPriority');
  }

  ShowStatus() {
    return this.http.get('http://localhost:8080/getStatus');
  }

  ShowTicketsAdmin() {
    this.router.navigate(['/home/admin-home']);
    this.displayTicketTable.next(true);
  }

  GetAdminDetails() {
    return this.http.get('http://localhost:8080/getAdminList');
  }

  DeleteTicket(ticketid: any, adminId: any) {
    return this.http.delete(`http://localhost:8080/deleteTicket?ticket_id=${ticketid}&admin_id=${adminId}`);
  }

  ChangeTicketStatus(ticketId: any, adminId: any, status: any, ticketData: any) {
    return this.http.put(`http://localhost:8080/changeStatus?ticket_id=${ticketId}&admin_id=${adminId}&status_id=${status}`, ticketData)
  }

  ChangeTicketPriority(ticketId: any, adminId: any, priority: any, ticketData: any) {
    return this.http.put(`http://localhost:8080/changePriority?ticket_id=${ticketId}&admin_id=${adminId}&priority_id=${priority}`, ticketData);
  }

  SetAssignee(admin: any, ticketId: any, userId: any) {
    return this.http.put(`http://localhost:8080/setAssignee?admin_id=${admin}&ticket_id=${ticketId}&user_id=${userId}`, null);
  }

}
