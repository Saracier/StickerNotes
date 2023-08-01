import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authGuard: AuthGuardService) {}

  // public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loginStatus: boolean = this.authGuard.checkIfIsLogedIn;

  // setLoginStatus(status: boolean) {
  //   this.loginStatus.next(status);
  // }
}
