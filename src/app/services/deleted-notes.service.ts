import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeletedNotesService {
  oldNotes: oldNote[] = [];
  catchOldNote(note: oldNote[]) {
    this.oldNotes.push(...note);
    console.log('note has been transferred to trash');
  }
  constructor() {}
}

interface oldNote {
  id: number;
  title: string;
  text: string;
}
