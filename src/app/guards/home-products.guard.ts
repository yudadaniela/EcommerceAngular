import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
class PermissionService {
  constructor(
    private router:Router,
    private authService:AuthService
  ) {}
  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree{
    if(this.authService.isAuthentication() && this.authService.isAdmi()||this.authService.isUser()){
     console.log('acceso activado home');
     return true
    }else {
     return this.router.createUrlTree([''])
    }
}
}
export const homeProductsGuard: CanActivateFn = (next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree => {
  return inject(PermissionService).canActivate(next, state);
};
