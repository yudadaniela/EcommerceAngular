import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
 counter:number=0 
sum(){
  this.counter ++;
}
subtraction(){
 if (this.counter>0){
  this.counter --;
 }
 
}
}
