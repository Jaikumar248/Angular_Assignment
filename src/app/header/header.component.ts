import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mainHeader: any;
  userName: any;
  userData: any;
  userLastName: any;
  showUserTable: boolean = false;
  constructor(private router: Router) {

  }
  ngOnInit(): any {

    this.homeContent();

    if (localStorage.getItem('admin')) {
      this.mainHeader = true;
    }
    if (localStorage.getItem('loggedInUser')) {
      this.mainHeader = false;
    }
  }

  // Logout current user
  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('admin');
    this.router.navigate(['']);
  }

  //After login this page will be load 
  homeContent() {
    this.router.navigate(['/home/message']);
  }

}
