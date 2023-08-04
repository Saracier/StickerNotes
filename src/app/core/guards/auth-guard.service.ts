import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
  isLoggedIn: boolean = this.authService.checkIfIsLogedIn;

  constructor(
    private route: Router,
    private http: HttpClient, // private loginService: LoginService
    private authService: AuthService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.checkIfIsLogedIn) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}
