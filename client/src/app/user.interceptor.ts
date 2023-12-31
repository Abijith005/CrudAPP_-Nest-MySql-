import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environment';
import { AuthService } from './modules/auth/auth.service';
import { IapiResponse } from 'src/interfaces/IapiResponse';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  // variable declarations
  refresh = false;

  constructor(
    private _authService: AuthService,
    private _toast: NgToastService,
    private _router: Router,
    private _matDialog: MatDialog
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedRequest = request.clone({
      url: environment.apiUrl + request.url,
      withCredentials: true,
    });

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      modifiedRequest = modifiedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: any) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !this.refresh
        ) {
          this.refresh = true;
          return this._authService.getNewAccessToken(refreshToken!).pipe(
            switchMap((res: IapiResponse) => {
              console.log(res);

              if (res.success) {
                localStorage.setItem('accessToken', res.accessToken!);

                // Retry the original request with the new access token
                modifiedRequest = modifiedRequest.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.accessToken}`,
                  },
                });

                return next.handle(modifiedRequest);
              } else {
                // If obtaining a new access token fails, propagate the error
                return throwError(error);
              }
            })
          );
        }

        this.refresh = false;
        this._matDialog.closeAll();
        if (error instanceof HttpErrorResponse && error.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this._router.navigate(['']);
          this._toast.error({
            detail: 'Unauthorized',
            summary: 'User unauthorized',
            duration: 3000,
          });
        } else {
          this._toast.error({
            detail: 'ERROR',
            summary: 'Internal server error',
            duration: 3000,
          });
        }

        return throwError(error);
      })
    );
  }
}
