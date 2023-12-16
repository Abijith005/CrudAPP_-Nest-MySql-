import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environment';
import { AuthService } from './modules/auth/auth.service';
import { IapiResponse } from 'src/interfaces/IapiResponse';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  // variable declarations
  refresh = false;

  constructor(private _authService: AuthService) {}

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
          refreshToken: refreshToken,
        },
      });
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: any) => {
        console.log('Error occurred', error);

        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !this.refresh
        ) {
          console.log('Unauthorized');

          return this._authService.getNewAccessToken().pipe(
            switchMap((res: IapiResponse) => {
              if (res.success) {
                localStorage.setItem('accessToken', res.accessToken!);

                // Retry the original request with the new access token
                modifiedRequest = modifiedRequest.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.accessToken}`,
                    refreshToken: refreshToken!,
                  },
                });

                return next.handle(modifiedRequest);
              } else {
                console.log('Error obtaining new access token');

                // If obtaining a new access token fails, propagate the error
                return throwError(error);
              }
            })
          );
        }

        this.refresh = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return throwError(error);
      })
    );
  }
}
