import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesArray } from '../notes-array';
import { NotesDataService } from '../services/notes-data.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent {
  searchedId: number;
  singleNote: { id: number; title: string; text: string };
  constructor(
    private route: ActivatedRoute,
    private NotesDataService: NotesDataService
  ) {}

  ngOnInit() {
    this.searchedId = this.route.snapshot.params['id'];
    const notes = this.NotesDataService.notes;
    const numberInArray = notes.findIndex((element) => {
      return element.id === this.searchedId;
    });
    if (numberInArray < 0) {
      throw new Error(
        'something went wrong. Index of note for delete exeeded array'
      );
    }
    this.singleNote = this.NotesDataService.notes[numberInArray];
    console.log(this.singleNote);
  }
}
