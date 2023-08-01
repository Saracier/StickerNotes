import { Injectable } from '@angular/core';
import { INote } from '../interfaces/inote';

@Injectable({
  providedIn: 'root',
})
export class DeletedNotesService {
  //
  // Todo: add persistant trash of notes
  //
  oldNotes: INote[] = [];
  catchOldNote(note: INote[]) {
    this.oldNotes.push(...note);
  }
}
