import { Component, ViewChild, ElementRef } from '@angular/core';
import { DeletedNotesService } from '../services/deleted-notes.service';
import { NotesDataService } from '../services/notes-data.service';

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
  counter: number = 1;
  notes = this.NotesDataService.notes;

  constructor(
    private deletedNotes: DeletedNotesService,
    private NotesDataService: NotesDataService
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
    // this.titleInputValue = '';
  }

  evaluateInput() {
    this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
    // this.inputContainsSomething = Boolean(this.titleInputValue.length > 0);
  }

  onDeleteSingleNote(deleteObject: { id: number }) {
    this.NotesDataService.onDeleteSingleNote(deleteObject);

    // const numberInArray = this.notes.findIndex((element) => {
    //   return element.id === deleteObject.id;
    // });
    // if (numberInArray < 0)
    //   throw new Error(
    //     'something went wrong. Index of note for delete exeeded array'
    //   );
    // this.deletedNotes.catchOldNote(this.notes.splice(numberInArray, 1));
  }

  // onUpdateInput(event: Event) {
  //   this.textInputValue = (<HTMLInputElement>event.target).value;
  //   this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
  // }
}
