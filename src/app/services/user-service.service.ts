import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CreateUser } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  categories : any = {
    1: "Hardware",
    2: "Software",
    3: "Access Management"
};

sub_categories : any = {
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

status : any = {
  1: "open",
  2: "Assigned",
  3: "In Progress",
  4: "Completed"
}

  priority : any = {
    1:"low",
    2:"medium",
    3:"high",
    4:"critical"
  }


  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  displayUserTable = new BehaviorSubject<boolean>(false);

  showTickets = new BehaviorSubject<boolean>(false);
  showTicketsTable = new BehaviorSubject<boolean>(false);
  staticMessage:boolean = true;

  addusers = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private router: Router, private activatedRoute:ActivatedRoute) { }

  UserCreate(data:CreateUser){
    return this.http.post('http://localhost:8080/createUser',data);
  }
  GetAllUsers(){
    return this.http.get('http://localhost:8080/viewAllUser');
  }

  GetUser(data:any){
    return this.http.get(`http://localhost:8080/viewUser?${data}`);
  }
 
  DeleteUser(id:any){
    return this.http.delete(`http://localhost:8080/deleteUser?user_id=${id}`);
  }

  ReloadData(){ 
      if(localStorage.getItem('loggedInUser')){
        this.isUserLoggedIn.next(true);
        this.router.navigate(['/home']);
      }
  }

  ReloadToAdmin(){
    if(localStorage.getItem('admin')){
      this.router.navigate(['/home']);
    }
  }

  ShowUsersInAdmin(){
    this.router.navigate(['/home/user-detials']);
    this.displayUserTable.next(true);

  }

  ShowTickets(){
    this.router.navigate(['/home/create-ticket']);
    this.showTickets.next(true);
  }

  ShowTicketsTable(){
    this.router.navigate(['/home/create-ticket']);
    this.showTicketsTable.next(true);
  }


  AddUsers(){
    this.addusers.next(true);
    this.router.navigate(['/home/users-home']);
  }

  UpdateUser(data:any){
    return this.http.put('http://localhost:8080/updateUser',data);
  }
 

}
