import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { AlertDirective } from '../directives/alert.directive';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponentComponent {
  @Input() message: string;
  @Output() closeEvent = new EventEmitter<void>();

  deleteComponent() {
    this.closeEvent.emit();
  }
}
