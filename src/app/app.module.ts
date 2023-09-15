import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { FocusDirective } from './shared/directives/focus.directive';
import { HomeComponent } from './containers/home/home.component';
import { AllNotesComponent } from './containers/all-notes/all-notes.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { EditNoteComponent } from './containers/edit-note/edit-note.component';
import { ClockComponent } from './components/clock/clock.component';
import { ContactFormTdComponent } from './containers/contact-form-td/contact-form-td.component';
import { ContactFormRComponent } from './containers/contact-form-r/contact-form-r.component';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { SharedModule } from './shared/shared.module';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
