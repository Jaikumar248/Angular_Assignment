import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Angular_Assignment';

  constructor(private router:Router){ }

  ngOnInit(): void {
    
  }
    
  Logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
