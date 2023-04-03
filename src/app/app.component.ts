import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular_Assignment';
  constructor(private router:Router){

  }
  ngOnInit(): void {
    // let localStorageData = localStorage.getItem('loggedInUser');
    // localStorageData = localStorageData && JSON.parse('localStorageData')[0];
    // console.log(localStorageData);
  }

 
  
  Logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
