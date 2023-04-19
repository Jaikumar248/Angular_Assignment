import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  loggedInUser:boolean = false;
  loggedInAdmin:boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('admin')){
      this.loggedInUser = false;
      this.loggedInAdmin = true;
    }
    if(localStorage.getItem('loggedInUser')){
      this.loggedInUser = true;
      this.loggedInAdmin = false;
    }
  }

}
