import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn:'root'
})
class PermissionService {
  constructor(
    private router:Router,
    private authService:AuthService
  ) {}
  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree{
    if(this.authService.isAuthentication() && this.authService.isAdmi()){
     console.log('acceso activado admi');
     return true
    }else if(this.authService.isAuthentication() && this.authService.isUser()){
      console.log(this.authService.isUser());
      return this.router.createUrlTree(['/home/homeProducts'])
    }else{
      console.log('no esta registrado');
      return this.router.createUrlTree([''])
    }
 } 
}
export const admiGuard: CanActivateFn = (next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree => {
  return inject(PermissionService).canActivate(next, state)
};
