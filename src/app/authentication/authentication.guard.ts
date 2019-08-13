import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let accessToken: string;
    const userId = sessionStorage.getItem('userId');
    accessToken = localStorage.getItem(userId);
    if (!accessToken) {
      this.router.navigate(['sign-in']);
    }
   return true;

  }
}
