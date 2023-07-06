import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}
  deleteHandler() {
    this.deleteNote.emit({ id: this.note.id });
  }

  goToEditComponent() {
    this.router.navigate(['/allNotes', 'edit', this.note.id]);
  }
}
