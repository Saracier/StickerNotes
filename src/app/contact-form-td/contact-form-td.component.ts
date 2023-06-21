import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form-td',
  templateUrl: './contact-form-td.component.html',
  styleUrls: ['./contact-form-td.component.scss'],
})
export class ContactFormTdComponent {
  messageInput: string;
  @ViewChild('formTDElement') formTDElement: NgForm;
  defoultAnswer = 'yes';
  genders = ['male', 'female'];
  // onSubmit(formElement: NgForm) {
  //   console.log(formElement);
  // }

  onSubmit() {
    console.log(this.formTDElement.value.userSendUsTicket);
    this.formTDElement.reset();
  }
}
