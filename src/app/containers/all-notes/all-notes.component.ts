import {
  Component,
  ViewChild,
  ElementRef,
  DoCheck,
  OnInit,
} from '@angular/core';
import { NotesDataService } from '../../core/notes-data.service';
import { HttpMethodsService } from '../../core/http-methods.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss'],
})
export class AllNotesComponent implements DoCheck, OnInit {
  filteredStatus = '';
  textInputValue = '';
  @ViewChild('titleInputValue', { static: true })
  titleInputValue: ElementRef<HTMLInputElement>;
  inputContainsSomething = false;
  notes = this.NotesDataService.notes;

  constructor(
    private NotesDataService: NotesDataService,
    private HttpMethodsService: HttpMethodsService
  ) {}

  ngOnInit() {
    this.fetchNotes();
  }

  addNewNote() {
    if (
      this.textInputValue.length === 0 ||
      this.titleInputValue.nativeElement.value.length === 0
    )
      return;
    this.NotesDataService.addNewNote(
      Math.random(),
      this.titleInputValue.nativeElement.value,
      this.textInputValue
    );

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

  //
  //
  //
  //
  //
  //To poniżej mi się nie podoba, ale nie wiem jak to zmienić
  //
  //
  //
  ngDoCheck() {
    this.notes = this.NotesDataService.notes;
  }
}
