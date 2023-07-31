import { Component, EventEmitter, Input, Output } from '@angular/core';

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
