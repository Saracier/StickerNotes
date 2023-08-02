import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form-r',
  templateUrl: './contact-form-r.component.html',
  styleUrls: ['./contact-form-r.component.scss'],
})
export class ContactFormRComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['Admin', 'Goku', 'Moderator', 'Saracier'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNamesCheck.bind(this),
        ]),
        gender: new FormControl('male'),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      marketing: new FormControl('yes'),
      message: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  forbiddenNamesCheck(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
}
