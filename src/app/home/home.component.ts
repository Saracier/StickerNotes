import { Component } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedIn: boolean;
  constructor(private authGuard: AuthGuardService) {
    this.isLoggedIn = authGuard.isLoggedIn;
  }

  toggleLoggedIn() {
    this.authGuard.toggleLoggedIn();
    this.isLoggedIn = this.authGuard.isLoggedIn;
  }
}
