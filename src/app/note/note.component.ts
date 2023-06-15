import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() note: { id: number; title: string; text: string } = {
    id: NaN,
    title: '',
    text: '',
  };
  @Output() deleteNote = new EventEmitter<{ id: number }>();
  constructor() {}
  deleteHandler() {
    this.deleteNote.emit({ id: this.note.id });
  }
}
