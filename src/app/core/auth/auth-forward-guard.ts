import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../../shared/services/login-service';

export const authForwardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const  authSrv= inject(LoginService);
  const activatedRoute = inject(ActivatedRoute);

  if (authSrv.isLogin()) {
    router.navigate(['..'], {relativeTo: activatedRoute});
    return false;
  }
  return true;


};
