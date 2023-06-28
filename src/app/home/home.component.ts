import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedIn: boolean;
  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(private authGuard: AuthGuardService) {
    this.isLoggedIn = authGuard.isLoggedIn;
  }

  ngOnInit() {
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  LogOut() {
    this.authGuard.LogOut();
  }

  toggleLoggedIn() {
    console.log('weszlo toggleloggedin');
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      alert('invalid passoword or email');
      return;
    }
    this.authGuard.toggleLoggedIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    console.log('weszlo toggleloggedin 5 linijek dalej');
    this.isLoggedIn = this.authGuard.isLoggedIn;
    localStorage.setItem('isLoggedIn', this.isLoggedIn ? '1' : '');
    console.log('loggedIn is ', this.isLoggedIn);
  }

  ngDoCheck() {
    this.isLoggedIn = this.authGuard.isLoggedIn;
  }
}
