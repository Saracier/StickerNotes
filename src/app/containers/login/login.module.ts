import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertDirective } from '../../shared/directives/alert.directive';
import { AlertComponentComponent } from '../../shared/alert/alert.component';

@NgModule({
  declarations: [LoginComponent, AlertDirective, AlertComponentComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule],
})
export class LoginModule {}
