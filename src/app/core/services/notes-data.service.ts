import { Injectable } from '@angular/core';
import { INote } from '../../interfaces/inote';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesDataService {
  mockNotes = [
    {
      id: 456456,
      title: 'Hello World My Wonderfoul place',
      text: 'Hello from the other site',
    },
    { id: 23423424, title: 'Hello Giedi Prime', text: 'I love Dune books' },
    { id: 6363688, title: 'Hello There', text: 'General Kenobi' },
  ];
  notes$ = new BehaviorSubject(this.mockNotes);

  addNewNote(id: number, title: string, text: string) {
    const currentNotes: INote[] = this.notes$.getValue();
    const newNotes = [
      ...currentNotes,
      {
        id: id,
        title: title,
        text: text,
      },
    ];
    this.notes$.next(newNotes);
  }

  onDeleteSingleNote(deleteObject: { id: number }) {
    const notesCopy: INote[] = this.notes$.getValue();
    const numberInArray = notesCopy.findIndex((element) => {
      return element.id === Number(deleteObject.id);
    });
    if (numberInArray < 0)
      throw new Error(
        'something went wrong. Index of note for delete exeeded array'
      );
    notesCopy.splice(numberInArray, 1);
    this.notes$.next(notesCopy);
  }
}
