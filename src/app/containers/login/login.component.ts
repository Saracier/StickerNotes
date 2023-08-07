import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertComponentComponent } from '../../shared/alert/alert.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertDirective } from 'src/app/shared/directives/alert.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild(AlertDirective, { static: false })
  appAlertDirective: AlertDirective;
  private closeDynamicComponentSub: Subscription;
  private toggleLoggedInSub: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  ngOnInit() {
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
    this.toggleLoggedInSub = this.authService
      .toggleLoggedIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: (data) => {
          this.router.navigate(['/']);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: (err) => {
          this.showErrorMessage('Invalid password or email');
        },
      });
  }

  private showErrorMessage(message: string) {
    const alertFactoryResolver =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertComponentComponent
      );

    const hostViewContainerRef = this.appAlertDirective.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef =
      hostViewContainerRef.createComponent(alertFactoryResolver);

    componentRef.instance.message = message;
    this.closeDynamicComponentSub = componentRef.instance.closeEvent.subscribe(
      () => {
        this.closeDynamicComponentSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  ngOnDestroy() {
    this.toggleLoggedInSub.unsubscribe();
  }
}
