import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  // constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('interceptor has came int beeing');
    // return next.handle(request)
    return next.handle(request).pipe(
      catchError((error) => this.handleError(error))
      // tap({
      //   next: (event) => console.log('event interceptor', event),
      //   // error: (error) => this.handleError(error),
      //   // console.log("error interceptor", error)
      // })
    );
    // return next.handle(request).pipe(
    //   tap(resData => {
    //     console.log('resData from LoggingInterceptor', resData)
    //     catchError(this.handleError)
    //   })
    //   );
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.status === HttpStatusCode.BadRequest) {
      // do sth
      errorMessage = 'Can not reach server';
    }
    // alert('invalid data');
    if (errorRes.error.error.message) {
      errorMessage = errorRes.error.error.message;
    }
    // if (!errorRes.error || !errorRes.error.error) {
    //   console.error(errorMessage);
    //   // return throwError(errorMessage);
    // }
    // console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
    // console.error(errorRes.error.error.message);
    // return errorRes.error.error.message;
  }
}
