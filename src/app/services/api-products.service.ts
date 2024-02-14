import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError, throwError}from 'rxjs'
import { ProductHome } from "../Models/products-home";

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  private upiUrl='http://localhost:3000/products';

  constructor(private http:HttpClient){}
  
  getData():Observable<ProductHome[]>{
    return this.http.get<ProductHome[]>(this.upiUrl)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))

  }
  getDataId(id:number):Observable<ProductHome>{
    return this.http.get<ProductHome>(`${this.upiUrl}/${id}`)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  addData(model:ProductHome):Observable<ProductHome>{
    return this.http.post<ProductHome>(this.upiUrl, model)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  upDate(id:number,model:ProductHome):Observable<ProductHome>{
    return this.http.put<ProductHome>(`${this.upiUrl}/${id}`, model)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.upiUrl}/${id}`)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
}
