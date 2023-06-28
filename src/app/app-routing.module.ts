import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { ContactFormTdComponent } from './contact-form-td/contact-form-td.component';
import { ContactFormRComponent } from './contact-form-r/contact-form-r.component';

const routes: Routes = [
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
