import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // let existsLogin = localStorage.getItem('sessionIdUser') != undefined
  // && localStorage.getItem('sessionIdUser') != null
  // && localStorage.getItem('sessionIdUser') != 'undefined';

  let existsLogin = localStorage.getItem('sessionJwtToken') != undefined
  && localStorage.getItem('sessionJwtToken') != null
  && localStorage.getItem('sessionJwtTokeny') != 'undefined';

  if (!existsLogin) {
    let router = inject(Router);
    router.navigate(['user/login']);
    return false;
  }
  return true;
};
