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

  ngOnInit() {
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
  }

  toggleLoggedIn() {
    this.authGuard.toggleLoggedIn(this.isLoggedIn);
    this.isLoggedIn = this.authGuard.isLoggedIn;
    localStorage.setItem('isLoggedIn', this.isLoggedIn ? '1' : '');
    console.log('loggedIn is ', this.isLoggedIn);
  }
}