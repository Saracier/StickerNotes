import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NotesDataService } from '../../services/notes-data.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent {
  searchedId: number;
  inputContainsSomething: boolean;
  noteNumberInArray: number;
  singleNote: { id: number; title: string; text: string };

  constructor(
    private route: ActivatedRoute,
    private NotesDataService: NotesDataService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('hello from edit', this.route.snapshot.params['id']);
    this.searchedId = this.route.snapshot.params['id'];
    console.log('this.searchedId', this.searchedId);
    const notes = this.NotesDataService.notes;
    console.log('notes', notes);
    this.noteNumberInArray = notes.findIndex((element) => {
      return element.id === Number(this.searchedId);
    });
    console.log('this.noteNumberInArray', this.noteNumberInArray);
    if (this.noteNumberInArray < 0) {
      throw new Error(
        'something went wrong. Index of note for delete exeeded array'
      );
    }
    const temporarySingleNote =
      this.NotesDataService.notes[this.noteNumberInArray];
    this.singleNote = { ...temporarySingleNote };
    console.log(this.singleNote);

    this.inputContainsSomething = Boolean(
      this.singleNote.title.length > 0 && this.singleNote.text.length > 0
    );
  }

  evaluateInput() {
    this.inputContainsSomething = Boolean(
      this.singleNote.title.length > 0 && this.singleNote.text.length > 0
    );
  }

  saveEditedNote() {
    if (!this.inputContainsSomething) return;
    this.NotesDataService.notes[this.noteNumberInArray] = this.singleNote;
    this.router.navigate(['/allNotes']);
  }
}
