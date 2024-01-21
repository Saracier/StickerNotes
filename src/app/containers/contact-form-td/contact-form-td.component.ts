import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form-td',
  templateUrl: './contact-form-td.component.html',
  styleUrls: ['./contact-form-td.component.scss'],
})
export class ContactFormTdComponent {
  messageInput: string;
  @ViewChild('formTDElement') formTDElement: NgForm;
  defaultAnswer = 'yes';
  genders = ['male', 'female'];

  onSubmit() {
    // Using console log is a bad practice, hence due to lack of email server I used it
    console.log(this.formTDElement.value.userSendUsTicket);
    this.formTDElement.reset();
  }
}
