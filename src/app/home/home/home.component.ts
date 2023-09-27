import { ApiServiceService } from './../../service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data:any
  constructor(private apiService:ApiServiceService){

  }
  ngOnInit(): void {
   this.apiService.getData().subscribe((respond)=>{
    this.data=respond
    console.log(respond);
    
   }) 
  }


}
