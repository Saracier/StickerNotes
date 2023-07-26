import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertDirectiveDirective } from '../../directives/alert-directive.directive';
import { AlertComponentComponent } from '../../alert/alert.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginService.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {
    // this.isLoggedIn = Boolean(localStorage.getItem('userData'));
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
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.showErrorMessage('invalid passoword or email');
      return;
    }
    this.authGuard.toggleLoggedIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    setTimeout(() => {
      console.log('this.isLoggedIn', this.isLoggedIn);
      if (!this.isLoggedIn) {
        this.showErrorMessage('invalid passoword or email');
        return;
      }
      this.router.navigate(['/']);
    }, 1000);
    // this.isLoggedIn = this.authGuard.isLoggedIn;
  }

  // standalone component. Skończyć go w wolnej chwili
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
