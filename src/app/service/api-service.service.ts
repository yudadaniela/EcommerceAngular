import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable}from 'rxjs'
import { ProductHome } from "../interface/products-home";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private upiUrl='https://fakestoreapi.com/products';

  constructor(private http:HttpClient){}
  getData():Observable<any>{
    return this.http.get<any>(this.upiUrl)
  }
  
}
