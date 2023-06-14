import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputValue = '';
  inputContainsSomething = false;
  notes: string[] = [];

  addNewNote() {
    this.notes.push(this.inputValue);
    this.inputValue = '';
  }

  onUpdateInput(event: Event) {
    this.inputValue = (<HTMLInputElement>event.target).value;
    this.inputContainsSomething = Boolean(this.inputValue.length > 0);
  }
}
