import { Component } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedIn: boolean;
  failedToLogIn = false;

  constructor(
    private authGuard: AuthGuardService,
    private loginService: LoginService
  ) {
    this.loginService.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  LogOut() {
    this.authGuard.LogOut();
  }
}
