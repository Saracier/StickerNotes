import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertDirectiveDirective } from '../alert-directive.directive';
import { AlertComponentComponent } from '../alert-component/alert-component.component';

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
