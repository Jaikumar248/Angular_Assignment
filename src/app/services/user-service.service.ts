import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CreateUser } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  categories: any = {
    1: "Hardware",
    2: "Software",
    3: "Access Management"
  };

  subCategories: any = {
    1: "Allocate Laptop",
    2: "Allocate Hardware",
    3: "Hardware replacement",
    4: "Software Installation",
    5: "Antivirus",
    6: "Email Password update",
    7: "Laptop Slowness issue.",
    8: "Software Issue",
    9: "Software access",
    10: "Wifi Access",
    11: "Database Access",
    12: "VPN Access"
  }

  status: any = {
    1: "open",
    2: "Assigned",
    3: "In Progress",
    4: "Completed"
  }

  priority: any = {
    1: "low",
    2: "medium",
    3: "high",
    4: "critical"
  }

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  displayUserTable = new BehaviorSubject<boolean>(false);
  showTickets = new BehaviorSubject<boolean>(false);
  showTicketsTable = new BehaviorSubject<boolean>(false);
  staticMessage: boolean = true;
  addusers = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userCreate(data: CreateUser) {
    return this.http.post('http://localhost:8080/createUser', data);
  }

  getAllUsers() {
    return this.http.get('http://localhost:8080/viewAllUser');
  }

  getAllUsersForLogin() {
    return this.http.get('http://localhost:8080/viewAllUserForLogin');
  }

  checkForLogin(item: any) {
    return this.http.get(`http://localhost:8080/checkuserexists?emailId=${item}`)
  }

  getUser(data: any) {
    return this.http.get(`http://localhost:8080/viewUser?${data}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`http://localhost:8080/deleteUser?userId=${id}`);
  }

  reloadData() {
    if (localStorage.getItem('loggedInUser')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/home']);
    }
  }

  reloadToAdmin() {
    if (localStorage.getItem('admin')) {
      this.router.navigate(['/home']);
    }
  }

  updateUser(data: any) {
    return this.http.put('http://localhost:8080/updateUser', data);
  }

}
