import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertComponentComponent } from '../../shared/alert/alert.component';
import { AuthService } from 'src/app/core/auth.service';
import { AuthGuardService } from 'src/app/core/auth-guard.service';
import { AlertDirective } from 'src/app/shared/directives/alert.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = this.authService.loginStatus;
  // isLoggedIn: boolean;
  @ViewChild(AlertDirective, { static: false })
  appAlertDirective: AlertDirective;
  private closeDynamicComponentSub: Subscription;

  constructor(
    private authGuard: AuthGuardService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private authService: AuthService
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
    this.authService
      .toggleLoggedIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.showErrorMessage('Invalid password or email');
        },
      });

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

    // setTimeout(() => {
    //   console.log("this.AuthService.loginStatus",this.authService.loginStatus)
    //   console.log("this.isLoggedIn",this.isLoggedIn)
    //   if (!this.isLoggedIn) {
    //     // console.log('error');
    //     this.showErrorMessage('Invalid passoword or email');
    //     return;
    //   }
    //   this.router.navigate(['/']);
    // }, 2000);
    // this.isLoggedIn = this.authGuard.isLoggedIn;
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
