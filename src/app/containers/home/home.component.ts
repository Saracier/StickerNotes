import { Component } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  shouldShowHelloMessage = false;
  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;
      if (event.url === '/') {
        this.shouldShowHelloMessage = true;
      } else {
        this.shouldShowHelloMessage = false;
      }
    });
  }

  get isLoggedInFn(): boolean {
    return this.authService.checkIfIsLogedIn;
  }

  LogOut() {
    this.authService.LogOut();
  }
}
