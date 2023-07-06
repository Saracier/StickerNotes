import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedIn: boolean;
  failedToLogIn = false;

  constructor(private authGuard: AuthGuardService) {
    this.isLoggedIn = authGuard.isLoggedIn;
  }

  LogOut() {
    this.authGuard.LogOut();
  }

  ngDoCheck() {
    this.isLoggedIn = this.authGuard.isLoggedIn;
  }
}
