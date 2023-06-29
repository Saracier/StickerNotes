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
  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  failedToLogIn = false;

  @ViewChild(AlertDirectiveDirective)
  appAlertDirective: AlertDirectiveDirective;

  constructor(
    private authGuard: AuthGuardService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
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

  private showErrorMessage(message: string) {
    const alertFactoryResolver =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertComponentComponent
      );

    const hostViewContainerRef = this.appAlertDirective.viewContainerRef;
    hostViewContainerRef.clear();

    const;
  }
}
