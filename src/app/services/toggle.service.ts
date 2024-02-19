import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  constructor() { }
  //de rxjs es un tipo especial de sujeto observable que almacena 
  //el valor actualy lo emite a cualquier nuevo subscriptor
  private isOpenSubject=new BehaviorSubject<boolean>(false)

  toggleSiderBar(){
    this.isOpenSubject.next(!this.isOpenSubject.value)
  }
  getIsOpen(){
    return this.isOpenSubject.asObservable()
  }
}
