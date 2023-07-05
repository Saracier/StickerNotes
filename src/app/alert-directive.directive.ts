import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlertDirective]',
})
export class AlertDirectiveDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
