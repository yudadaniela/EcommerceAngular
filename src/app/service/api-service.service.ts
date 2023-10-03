import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable}from 'rxjs'
import { ProductHome } from "../interface/products-home";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private upiUrl='http://localhost:3000/products';

  constructor(private http:HttpClient){}
  
  getData():Observable<ProductHome[]>{
    return this.http.get<ProductHome[]>(this.upiUrl)
  }
  addData(model:ProductHome):Observable<ProductHome>{
    return this.http.post<ProductHome>(this.upiUrl, model)
  }
  upDate(id:number,model:ProductHome):Observable<ProductHome>{
    return this.http.put<ProductHome>(`${this.upiUrl}/${id}`, model)
  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.upiUrl}/${id}`)
  }
}
