import { Component } from '@angular/core';
import { AuthGuardService } from '../../core/auth-guard.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedIn: boolean = this.isLoggedInFn;
  // isLoggedIn: boolean;
  failedToLogIn = false;

  constructor(
    private authGuard: AuthGuardService,
    private authService: AuthService
  ) {
    // this.loginService.loginStatus.subscribe((status) => {
    //   this.isLoggedIn = status;
    // });
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  get isLoggedInFn(): boolean {
    console.log('in home component login has been checked');
    return this.authGuard.checkIfIsLogedIn;
  }

  LogOut() {
    this.authGuard.LogOut();
  }
}
