import { ApiServiceService } from './../../service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ProductHome } from 'src/app/interface/products-home';
import { ItemCar } from "../../interface/item-Cart";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data:any
  constructor(private apiService:ApiServiceService){

  }
  addToCar(item:ProductHome){
   //console.log(item);
   let shopping:ItemCar={
     id:item.id,
     title:item.title,
     price:item.price,
     quantity:1
   }
   let car:ItemCar[]=[]
   car.push(shopping)
   console.log(car);
   
   localStorage.setItem('car', JSON.stringify(car))

  }
  
  
  ngOnInit(): void {
   this.apiService.getData().subscribe((respond)=>{
    this.data=respond
    console.log(respond);
    
   }) 
  }


}
