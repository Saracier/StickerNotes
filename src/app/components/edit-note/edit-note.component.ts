import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesDataService } from '../../core/notes-data.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
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
    this.searchedId = this.route.snapshot.params['id'];
    const notes = this.NotesDataService.notes;
    this.noteNumberInArray = notes.findIndex((element) => {
      return element.id === Number(this.searchedId);
    });
    if (this.noteNumberInArray < 0) {
      throw new Error(
        'something went wrong. Index of note for delete exeeded array'
      );
    }
    const temporarySingleNote =
      this.NotesDataService.notes[this.noteNumberInArray];
    this.singleNote = { ...temporarySingleNote };

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
