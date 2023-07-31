import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { FocusDirective } from './shared/directives/focus.directive';
import { HomeComponent } from './components/home/home.component';
import { AllNotesComponent } from './containers/all-notes/all-notes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { ClockComponent } from './components/clock/clock.component';
import { ContactFormTdComponent } from './components/contact-form-td/contact-form-td.component';
import { ContactFormRComponent } from './components/contact-form-r/contact-form-r.component';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AlertComponentComponent } from './alert/alert.component';
// import { AlertDirective } from './directives/alert.directive';
// import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    FocusDirective,
    HomeComponent,
    AllNotesComponent,
    NotFoundComponent,
    EditNoteComponent,
    ClockComponent,
    ContactFormTdComponent,
    ContactFormRComponent,
    ShortenPipe,
    FilterPipe,
    // AlertComponentComponent,
    // LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
