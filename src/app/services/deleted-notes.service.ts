import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeletedNotesService {
  //
  // Todo: add persistant trash of notes
  //
  oldNotes: oldNote[] = [];
  catchOldNote(note: oldNote[]) {
    this.oldNotes.push(...note);
  }
}

interface oldNote {
  id: number;
  title: string;
  text: string;
}
