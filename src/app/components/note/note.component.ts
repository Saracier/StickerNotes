import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from 'src/app/interfaces/inote';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() note: INote = {
    id: NaN,
    title: '',
    text: '',
  };
  @Input() index: number;
  @Output() deleteNote = new EventEmitter<{ id: number }>();
  constructor(private router: Router) {}

  deleteHandler() {
    this.deleteNote.emit({ id: this.note.id });
  }

  goToEditComponent() {
    this.router.navigate(['/allNotes', 'edit', this.note.id]);
  }
}
