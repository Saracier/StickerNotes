import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { AllNotesComponent } from './containers/all-notes/all-notes.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { EditNoteComponent } from './containers/edit-note/edit-note.component';
import { ContactFormTdComponent } from './containers/contact-form-td/contact-form-td.component';
import { ContactFormRComponent } from './containers/contact-form-r/contact-form-r.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./containers/login/login.module').then((m) => m.LoginModule),
    // component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: 'allNotes',
        component: AllNotesComponent,
        children: [
          {
            path: 'edit/:id',

            component: EditNoteComponent,
          },
        ],
      },
      { path: 'contacttd', component: ContactFormTdComponent },
      { path: 'contactr', component: ContactFormRComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
