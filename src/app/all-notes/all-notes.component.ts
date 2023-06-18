import { Component, ViewChild, ElementRef } from '@angular/core';
import { DeletedNotesService } from '../services/deleted-notes.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss'],
})
export class AllNotesComponent {
  textInputValue = '';
  @ViewChild('titleInputValue', { static: true })
  titleInputValue: ElementRef<HTMLInputElement>;
  inputContainsSomething = false;
  notes: { id: number; title: string; text: string }[] = [...exampleNotesArray];
  counter: number = 1;

  constructor(private deletedNotes: DeletedNotesService) {}

  addNewNote() {
    if (
      this.textInputValue.length === 0 ||
      this.titleInputValue.nativeElement.value.length === 0
    )
      return;
    this.notes.push({
      id: this.counter,
      title: this.titleInputValue.nativeElement.value,
      text: this.textInputValue,
    });
    this.counter++;
    this.textInputValue = '';
    // this.titleInputValue = '';
  }

  evaluateInput() {
    this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
    // this.inputContainsSomething = Boolean(this.titleInputValue.length > 0);
  }

  onDeleteSingleNote(deleteObject: { id: number }) {
    const numberInArray = this.notes.findIndex((element) => {
      return element.id === deleteObject.id;
    });
    if (numberInArray < 0)
      throw new Error(
        'something went wrong. Index of note for delete exeeded array'
      );
    this.deletedNotes.catchOldNote(this.notes.splice(numberInArray, 1));
  }

  // onUpdateInput(event: Event) {
  //   this.textInputValue = (<HTMLInputElement>event.target).value;
  //   this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
  // }
}

const exampleNotesArray = [
  { id: 456456, title: 'Hello World', text: 'Hello from the other site' },
  { id: 23423424, title: 'Hello Giedi Prime', text: 'I love Dune books' },
  { id: 6363688, title: 'Hello There', text: 'General Kenobi' },
];
