import { Injectable } from '@angular/core';
import { NotesArray } from '../notes-array';
import { DeletedNotesService } from '../services/deleted-notes.service';

@Injectable({
  providedIn: 'root',
})
export class NotesDataService {
  constructor(private deletedNotes: DeletedNotesService) {}
  notes: NotesArray = [
    {
      id: 456456,
      title: 'Hello World My Wonderfoul place',
      text: 'Hello from the other site',
    },
    { id: 23423424, title: 'Hello Giedi Prime', text: 'I love Dune books' },
    { id: 6363688, title: 'Hello There', text: 'General Kenobi' },
  ];

  addNewNote(id: number, title: string, text: string) {
    this.notes.push({
      id: id,
      title: title,
      text: text,
    });
  }

  // handleServerRes() {
  //   this.httpService.fetchNotesFromBackend.subscribe(res => {
  //     this.addNewNote(res);
  //   }
  //     ))
  // }

  onDeleteSingleNote(deleteObject: { id: number }) {
    const numberInArray = this.notes.findIndex((element) => {
      return element.id === Number(deleteObject.id);
    });
    if (numberInArray < 0)
      throw new Error(
        'something went wrong. Index of note for delete exeeded array'
      );
    this.deletedNotes.catchOldNote(this.notes.splice(numberInArray, 1));
  }
}
