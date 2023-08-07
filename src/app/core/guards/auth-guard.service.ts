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

  constructor(private route: Router, private authService: AuthService) {}

  canActivateChild(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.checkIfIsLogedIn) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}
