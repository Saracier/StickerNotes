import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
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
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) =>
          console.log('event interceptor', event),
          // ok = event instanceof HttpResponse ? 'succeeded' : ''
        // Operation failed; error is an HttpErrorResponse
        error: (error) =>
          this.handleError(error),
          // console.log("error interceptor", error)
          // ok = 'failed'
      })
    );
    // return next.handle(request).pipe(
    //   tap(resData => {
    //     console.log('resData from LoggingInterceptor', resData)
    //     catchError(this.handleError)
    //   })
    //   );
  }

  handleError(errorRes: HttpErrorResponse) {
    // alert('invalid data');
    const errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      console.error(errorMessage);
      // return throwError(errorMessage);
    }
    console.error(errorRes.error.error.message);
    // return errorRes.error.error.message;
  }
}
