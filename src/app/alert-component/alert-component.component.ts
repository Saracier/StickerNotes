import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AlertDirectiveDirective } from '../alert-directive.directive';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss'],
})
export class AlertComponentComponent {
  @ViewChild(AlertDirectiveDirective)
  appAlertDirective: AlertDirectiveDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private showErrorMessage(message: string) {
    const alertFactoryResolver =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertComponentComponent
      );

    const hostViewContainerRef = this.appAlertDirective.viewContainerRef;
  }
}
