import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IResponseFirebase } from '../../interfaces/iresponse-firebase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatus: boolean = this.checkIfIsLogedIn;

  constructor(private http: HttpClient) {}

  LogOut() {
    document.cookie = 'email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'expiresIn= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  }

  get checkIfIsLogedIn() {
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let singleCookie = cookiesArray[i];
      while (singleCookie.charAt(0) == ' ') {
        singleCookie = singleCookie.substring(1);
      }
      if (singleCookie.indexOf('userId') == 0) {
        return Boolean(
          singleCookie.substring('userId'.length + 1, singleCookie.length)
        );
      }
    }
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
    document.cookie = `email=${email}`;
    document.cookie = `userId=${userId}`;
    document.cookie = `token=${token}`;
    document.cookie = `expiresIn=${expiresIn}`;
  }

  toggleLoggedIn(
    email: string,
    password: string
  ): Observable<IResponseFirebase | null> {
    const wasAlreadyLoggedIn = this.checkIfIsLogedIn;
    if (wasAlreadyLoggedIn && this.checkIfIsLogedIn === false) {
      return of(null);
    }
    return this.http
      .post<IResponseFirebase>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7DVQvn0G9g3uhJBkKhVAyBPHP0c67JCE',
        { email: email, password: password, returnSecureToken: true }
      )
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
      );
  }
}
