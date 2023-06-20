import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
  isLoggedIn = false;

  toggleLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = !isLoggedIn;
    console.log('loggedIn is ', this.isLoggedIn);
  }
  constructor(private route: Router) {}

  resolveIsAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
    return promise;
  }

  // CanActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   if (this.isLoggedIn) {
  //     return this.resolveIsAuthenticated();
  //   }
  //   this.route.navigate(['/']);
  //   return false;
  // }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('loggedIn is in guard', this.isLoggedIn);
    console.log(
      'local storage status in guard ',
      localStorage.getItem('isLoggedIn'),
      Boolean(localStorage.getItem('isLoggedIn'))
    );
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
    console.log('loggedIn is in guard', this.isLoggedIn);
    if (this.isLoggedIn) {
      return this.resolveIsAuthenticated();
    }
    this.route.navigate(['/']);
    return false;
  }
}
