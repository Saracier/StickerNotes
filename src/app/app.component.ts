import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  textInputValue = '';
  // titleInputValue = '';
  inputContainsSomething = false;
  notes: { id: number; title: string; text: string }[] = [];
  counter: number = 1;

  addNewNote(titleInputValue: HTMLInputElement) {
    if (this.textInputValue.length === 0 || titleInputValue.value.length === 0)
      return;
    this.notes.push({
      id: this.counter,
      title: titleInputValue.value,
      text: this.textInputValue,
    });
    this.counter++;
    this.textInputValue = '';
    // this.titleInputValue = '';
  }

  evaluateInput() {
    this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
    // this.inputContainsSomething = Boolean(this.titleInputValue.length > 0);
  }

  onDeleteSingleNote(deleteObject: { id: number }) {
    const numberInArray = this.notes.findIndex((element) => {
      return element.id === deleteObject.id;
    });
    if (numberInArray < 0)
      throw new Error(
        'something went wrong. Note for delete exeeded index of array'
      );
    this.notes.splice(numberInArray, 1);
  }

  // onUpdateInput(event: Event) {
  //   this.textInputValue = (<HTMLInputElement>event.target).value;
  //   this.inputContainsSomething = Boolean(this.textInputValue.length > 0);
  // }
}
