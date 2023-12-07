import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { AlertComponentComponent } from './shared/alert/alert.component';
import { AlertDirective } from './shared/directives/alert.directive';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  @ViewChild(AlertDirective, { static: false })
  appAlertDirective: AlertDirective;
  private closeDynamicComponentSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private showMessage(message: string) {
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
    this.closeDynamicComponentSub.unsubscribe();
  }
}
