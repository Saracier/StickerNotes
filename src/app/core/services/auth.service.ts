import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { AuthGuardService } from '../guards/auth-guard.service';
import { IResponseFirebase } from '../../interfaces/iresponse-firebase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatus: boolean = this.checkIfIsLogedIn;

  constructor(private http: HttpClient) {}

  LogOut() {
    // localStorage.removeItem('userData');
    document.cookie = 'email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'expiresIn= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    // this.loginService.setLoginStatus(false);
    // this.isLoggedIn = this.checkIfIsLogedIn;
  }

  get checkIfIsLogedIn() {
    console.log('sth has checked is is loged in');
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf('userId') == 0) {
        console.log(
          'has returned',
          Boolean(c.substring('userId'.length + 1, c.length))
        );
        return Boolean(c.substring('userId'.length + 1, c.length));
      }
    }
    console.log('Has false returned in the end');
    return false;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const user = { email, userId, token, expirationDate: expiresIn };
    if (!user.email) {
      return;
    }
    // localStorage.setItem('userData', JSON.stringify(user));
    document.cookie = `email=${email}`;
    document.cookie = `userId=${userId}`;
    document.cookie = `token=${token}`;
    document.cookie = `expiresIn=${expiresIn}`;

    // this.loginService.setLoginStatus(true);
  }

  toggleLoggedIn(
    email: string,
    password: string
  ): Observable<IResponseFirebase | null> {
    // async toggleLoggedIn(email: string, password: string) {
    const wasAlreadyLoggedIn = this.checkIfIsLogedIn;
    if (wasAlreadyLoggedIn && this.checkIfIsLogedIn === false) {
      // this.loginService.setLoginStatus(true);
      return of(null);
    }
    return (
      this.http
        .post<IResponseFirebase>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7DVQvn0G9g3uhJBkKhVAyBPHP0c67JCE',
          { email: email, password: password, returnSecureToken: true }
        )
        // .pipe(
        //   catchError(this.handleError)
        //   // tap((resData: any) => {
        //   //   this.handleAuthentication(
        //   //     resData.email,
        //   //     resData.localId,
        //   //     resData.idToken,
        //   //     +resData.expiresIn
        //   //   );
        //   // })
        // )
        .pipe(
          tap((res) => {
            if (!res) return;
            this.handleAuthentication(
              res.email,
              res.localId,
              res.idToken,
              +res.expiresIn
            );
          })
        )
    );
    // .subscribe((res) => {
    //   console.log('res', res);
    //   if (!res) return;
    //   this.handleAuthentication(
    //     res.email,
    //     res.localId,
    //     res.idToken,
    //     +res.expiresIn
    //   );
    //   return res;
    // });
  }

  // public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // setLoginStatus(status: boolean) {
  //   this.loginStatus.next(status);
  // }
}
