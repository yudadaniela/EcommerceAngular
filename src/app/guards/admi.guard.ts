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
    if(this.authService.ifAuthentication() && this.authService.isAdmi()){
     console.log('acceso activado home');
     return true
    }else{
     return this.router.createUrlTree(['/home'])
    }
 } 
}
export const admiGuard: CanActivateFn = (next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree => {
  return inject(PermissionService).canActivate(next, state )
};
