import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertDirective } from '../directives/alert.directive';
import { AlertComponentComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = this.loginService.loginStatus;
  // isLoggedIn: boolean;
  @ViewChild(AlertDirective, { static: false })
  appAlertDirective: AlertDirective;
  private closeDynamicComponentSub: Subscription;

  constructor(
    private authGuard: AuthGuardService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private loginService: LoginService
  ) {
    // this.loginService.loginStatus.subscribe((status) => {
    //   this.isLoggedIn = status;
    // });
  }

  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

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

  async toggleLoggedIn() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.showErrorMessage('invalid passoword or email');
      return;
    }
    this.authGuard.toggleLoggedIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    // const res = await this.authGuard.toggleLoggedIn(
    //   this.loginForm.value.email,
    //   this.loginForm.value.password
    // );

    // console.log('has started testing res', res);
    // if (res instanceof Error) {
    //   this.showErrorMessage('Invalid passoword or email');
    //   return;
    // }
    // console.log('res && res.idToken', res && res.idToken);
    // if (res && res.idToken) {
    //   this.router.navigate(['/']);
    // }

    // .then((res) => {
    //   console.log('has started testing res', res);
    //   if (res instanceof Error) {
    //     this.showErrorMessage('Invalid passoword or email');
    //     return;
    //   }
    //   console.log('res && res.idToken', res && res.idToken);
    //   if (res && res.idToken) {
    //     this.router.navigate(['/']);
    //   }
    // });

    setTimeout(() => {
      if (!this.isLoggedIn) {
        // console.log('error');
        this.showErrorMessage('Invalid passoword or email');
        return;
      }
      this.router.navigate(['/']);
    }, 1000);
    this.isLoggedIn = this.authGuard.isLoggedIn;
  }

  private showErrorMessage(message: string) {
    const alertFactoryResolver =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertComponentComponent
      );
    console.log('alertFactoryResolver', alertFactoryResolver);

    const hostViewContainerRef = this.appAlertDirective.viewContainerRef;
    hostViewContainerRef.clear();
    console.log('hostViewContainerRef', hostViewContainerRef);

    const componentRef =
      hostViewContainerRef.createComponent(alertFactoryResolver);
    console.log('componentRef', componentRef);

    componentRef.instance.message = message;
    this.closeDynamicComponentSub = componentRef.instance.closeEvent.subscribe(
      () => {
        this.closeDynamicComponentSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
}
