import { Component } from '@angular/core';
import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedIn: boolean = this.authService.checkIfIsLogedIn;
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
    return this.authService.checkIfIsLogedIn;
  }

  LogOut() {
    this.authService.LogOut();
  }
}
