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
  /**
   * 
   * @returns Return observable with array of products
   */
  getData():Observable<ProductHome[]>{
    return this.http.get<ProductHome[]>(this.upiUrl)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  /**
   * 
   * @param id identificator of product 
   * @returns Return observable with product 
   */
  getDataId(id:number):Observable<ProductHome>{
    return this.http.get<ProductHome>(`${this.upiUrl}/${id}`)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  /**
   * 
   * @param model object the product that want add
   * @returns return post method to add the product to data
   */
  addData(model:ProductHome):Observable<ProductHome>{
    return this.http.post<ProductHome>(this.upiUrl, model)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  /**
   * 
   * @param id product identifier
   * @param model modified product object 
   * @returns Retunt method put for modified or update 
   */
  upDate(id:number,model:ProductHome):Observable<ProductHome>{
    return this.http.put<ProductHome>(`${this.upiUrl}/${id}`, model)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
  /**
   * 
   * @param id product identifier
   * @returns return method delete for erase a product
   */
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.upiUrl}/${id}`)
    .pipe(catchError((error)=>{
      return throwError(()=>{error})
    }))
  }
}
