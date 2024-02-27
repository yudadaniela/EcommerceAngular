import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ProductHome } from '../Models/products-home';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  private upiUrl = 'http://localhost:3000/products';
  private apiUrl ='https://localhost:7094/swagger/v1/swagger.json'

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  /**
   *
   * @returns Return observable with array of products
   */
  getData(): Observable<ProductHome[]> {
    return this.http.get<ProductHome[]>(this.upiUrl).pipe(
      catchError((error) => {
        return throwError(() => {
          error;
        });
      })
    );
  }
  /**
   *
   * @param id identificator of product
   * @returns Return observable with product
   */
  getDataId(id: number): Observable<ProductHome> {
    return this.http.get<ProductHome>(`${this.upiUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => {
          error;
        });
      })
    );
  }
  /**
   *
   * @param model object the product that want add
   * @returns return post method to add the product to data
   */
  addData(model: ProductHome): Observable<ProductHome> {
    if (!this.authService.isAuthentication()) {
      this.router.navigate(['/auth/login']);
    }
    return this.http.post<ProductHome>(this.upiUrl, model).pipe(
      catchError((error) => {
        return throwError(() => {
          error;
        });
      })
    );
  }
  /**
   *
   * @param id product identifier
   * @param model modified product object
   * @returns Retunt method put for modified or update
   */
  upDate(id: number, model: ProductHome): Observable<ProductHome> {
    if (!this.authService.isAuthentication()) {
      this.router.navigate(['/auth/login']);
    }
    return this.http.put<ProductHome>(`${this.upiUrl}/${id}`, model).pipe(
      catchError((error) => {
        return throwError(() => {
          error;
        });
      })
    );
  }
  /**
   *
   * @param id product identifier
   * @returns return method delete for erase a product
   */
  delete(id: number): Observable<void> {
    if (!this.authService.isAuthentication()) {
      this.router.navigate(['/auth/login']);
    }
    return this.http.delete<void>(`${this.upiUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => {
          error;
        });
      })
    );
  }
}
