import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const token = localStorage.getItem('sessionJwtToken');

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Redirigir al usuario a la página de inicio de sesión si el token ha expirado
          localStorage.clear();
          router.navigate(['/user/login']).then(() => {
            window.location.reload();
          });
        }
        return throwError(error);
      })
    );
  } else {
    return next(req);
  }
};
