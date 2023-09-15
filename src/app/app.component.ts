import {
  AfterViewInit,
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
export class AppComponent implements OnDestroy, AfterViewInit {
  @ViewChild(AlertDirective, { static: false })
  appAlertDirective: AlertDirective;
  private closeDynamicComponentSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    this.showMessage(
      `This app has been made strictly to show the capabilities of Angular code.
      It has terrible UI / UX, but it was never meant to be pretty. If you would like to watch something less terryfiyng, I would welcome you to another project: https://github.com/Saracier/PersonalBudgeter`
    );
  }

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
