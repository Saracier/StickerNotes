import { Component, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { NotesDataService } from '../../services/notes-data.service';
import { HttpMethodsService } from '../../services/http-methods.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss'],
})
export class AllNotesComponent {
  filteredStatus = '';
  textInputValue = '';
  @ViewChild('titleInputValue', { static: true })
  titleInputValue: ElementRef<HTMLInputElement>;
  inputContainsSomething = false;
  counter = 1;
  notes = this.NotesDataService.notes;

  constructor(
    private NotesDataService: NotesDataService,
    private HttpMethodsService: HttpMethodsService
  ) {}

  addNewNote() {
    if (
      this.textInputValue.length === 0 ||
      this.titleInputValue.nativeElement.value.length === 0
    )
      return;
    this.NotesDataService.addNewNote(
      this.counter,
      this.titleInputValue.nativeElement.value,
      this.textInputValue
    );

    this.counter++;
    this.textInputValue = '';
  }

  evaluateInput() {
    this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
  }

  onDeleteSingleNote(deleteObject: { id: number }) {
    this.NotesDataService.onDeleteSingleNote(deleteObject);
  }

  postNotes() {
    this.HttpMethodsService.postNotesToBackend();
  }

  fetchNotes() {
    this.HttpMethodsService.fetchNotesFromBackend();
  }

  ngDoCheck() {
    this.notes = this.NotesDataService.notes;
  }
}
