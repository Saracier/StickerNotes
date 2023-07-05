import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertDirectiveDirective } from '../alert-directive.directive';
import { AlertComponentComponent } from '../alert-component/alert-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoggedIn: boolean;
  @ViewChild(AlertDirectiveDirective, { static: false })
  appAlertDirective: AlertDirectiveDirective;

  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private authGuard: AuthGuardService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
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

  toggleLoggedIn() {
    console.log('weszlo toggleloggedin');
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      // alert('invalid passoword or email');
      this.showErrorMessage('invalid passoword or email');
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
    this.router.navigate(['/']);
  }

  private showErrorMessage(message: string) {
    const alertFactoryResolver =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertComponentComponent
      );

    const hostViewContainerRef = this.appAlertDirective.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertFactoryResolver);
  }
}
