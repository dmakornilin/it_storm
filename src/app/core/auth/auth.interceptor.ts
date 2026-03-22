import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, finalize, switchMap, throwError} from 'rxjs';
import {RefreshResponseType} from '../../../types/usr_services/refresh-response.type';
import {Router} from '@angular/router';
import {LoaderSrv} from '../../shared/services/loader-srv';
import {LoginService} from '../../shared/services/login-service';
import {StorageAuthinfoService} from '../common-srv/storage-authinfo-service';



export const authInterceptor: HttpInterceptorFn = (req, next) => {

  function handle401error() {
    return loginSrv.refresh()
      .pipe(
        switchMap( (data:RefreshResponseType) => {
          if (data && data.accessToken && data.refreshToken) {
            authSrv.setTokens(data.accessToken, data.refreshToken);
            const repReg = req.clone({        // headers: req.headers.set('x-access-token', tokens.accessToken)   }
              headers: req.headers.set('x-auth', data.accessToken)
            });
            return next(repReg);
          } else {
            return throwError(() => new Error('Repeat request error'))
          }
        }),
        catchError(() => {
          authSrv.removeTokens();
          authSrv.removeUserInfo();
          router.navigate(['/']);
          return throwError(() => new Error('Repeat request backend error'))
        })
      )
  }

  const router =inject(Router);
  const authSrv = inject(StorageAuthinfoService);
  const loginSrv=inject(LoginService);
  const tokens = authSrv.getTokens();
  const loaderService = inject(LoaderSrv);

  loaderService.show();

  if (tokens.accessToken) {

    const authReg = req.clone({        // headers: req.headers.set('x-access-token', tokens.accessToken)   }
      headers: req.headers.set('x-auth', tokens.accessToken)
    })

    return next(authReg)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 && !authReg.url.includes('/login') && !authReg.url.includes('/refresh') && !authReg.url.includes('/signup')) {
            return handle401error();

          }
          return throwError(() => err);
        }),
        finalize(() => {
          loaderService.hide();
        })
      )


  }
  return next(req)
    .pipe(finalize(() => loaderService.hide()
    ));


};


