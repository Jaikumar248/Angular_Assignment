import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service:UserServiceService, private router:Router){

  }
  ngOnInit(): void {
    
  }

  CreateSignUp(data:any){
    console.log(data)
    this.service.UserCreate(data)
   
  }

}
