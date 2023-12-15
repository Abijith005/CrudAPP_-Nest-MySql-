import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedRequest = request.clone({
      url: environment.apiUrl + request.url,
      withCredentials: true,
    });
    const accessToken= localStorage.getItem('accessToken');
    const refreshToken=localStorage.getItem('refreshToken')
    
    if (accessToken&&refreshToken) {
      modifiedRequest = modifiedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          'refreshToken':refreshToken
        },
      });
    }    

    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        console.log('gggggggggggggggggggggggggggggggggggggggggggg',event instanceof HttpResponse);

        
        if (event instanceof HttpResponse ) {
          const headers=event.headers
          console.log(event,'lllllllllllllllllllllllllllllllllllllllllllllllllllllllll');
          
          // Update localStorage with the new access token
          const newAccessToken = event.headers.get('newaccesstoken')!;
          console.log(newAccessToken,'newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
          
          localStorage.setItem('accessToken', newAccessToken);
        }
      }),
      catchError((error:any)=>{
        if (error instanceof HttpErrorResponse&&error.status==401) {
          localStorage.removeItem('accessToken')
        }
        return throwError(error)
      })
    );
  }
}
