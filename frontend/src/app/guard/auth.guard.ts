import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',  // 🔥 Esto evita que se necesite instanciar con "new"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const sessionIdUser = localStorage.getItem('sessionIdUser');
    if (!sessionIdUser) {
      // 🔥 Si no hay sesión, redirigir al login
      this.router.navigate(['/user/login']);
      return false;
    }
    return true;
  }
}