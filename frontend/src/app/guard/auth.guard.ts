import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('sessionJwtToken');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/user/login']);
      return false;
    }
    return true;
  }
}