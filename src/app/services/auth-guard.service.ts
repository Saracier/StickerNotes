import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
  isLoggedIn = false;

  constructor(private route: Router, private http: HttpClient) {}

  toggleLoggedIn(email: string, password: string) {
    console.log('toggle logged in w auth guard', email, password);
    if (localStorage.getItem('userData') && this.isLoggedIn === false) {
      this.isLoggedIn = true;
    } else if (localStorage.getItem('userData')) {
      console.log('auth guard toggleloggedin first check ');
      localStorage.removeItem('userData');
      this.isLoggedIn = false;
      return;
    }
    this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7DVQvn0G9g3uhJBkKhVAyBPHP0c67JCE',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData: any) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      )
      .subscribe((res) => console.log(res));
  }

  LogOut() {
    console.log('Hello from authguard. Logged out ');
    localStorage.removeItem('userData');
    this.isLoggedIn = false;
  }

  checkIfUserShouldBeLogged(shouldtrust?: boolean) {
    if (shouldtrust) {
      this.isLoggedIn = true;
      console.log(
        'isloggedin wewnatrz checkIfUserShouldBeLogged',
        this.isLoggedIn
      );
      return;
    }
    const userDataFromStorage = localStorage.getItem('userData');
    let userData: any;
    if (userDataFromStorage) {
      userData = JSON.parse(userDataFromStorage);
    }
    if (userData) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const user = { email, userId, token, expirationDate: expiresIn };
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    console.log('auth gurard handle authentication', user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.checkIfUserShouldBeLogged(true);
  }

  handleError(errorRes: HttpErrorResponse) {
    console.log('handleError w authguard');
    alert('invalid data');
    const errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return errorRes.error.error.message;
  }

  resolveIsAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });
    return promise;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const dataInStorage = localStorage.getItem('userData');
    if (!dataInStorage) return false;
    this.isLoggedIn = Boolean(JSON.parse(dataInStorage).userId);
    console.log(
      'loggedIn is in guard',
      this.isLoggedIn,
      JSON.parse(dataInStorage).userId
    );
    if (this.isLoggedIn) {
      return this.resolveIsAuthenticated();
    }

    this.route.navigate(['/']);
    return false;
  }
}
