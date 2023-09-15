import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDirective } from '../shared/directives/alert.directive';
import { AlertComponentComponent } from '../shared/alert/alert.component';

@NgModule({
  declarations: [AlertDirective, AlertComponentComponent],
  imports: [CommonModule],
  exports: [AlertDirective, AlertComponentComponent],
})
export class SharedModule {}
