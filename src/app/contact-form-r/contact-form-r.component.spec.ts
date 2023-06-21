import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormRComponent } from './contact-form-r.component';

describe('ContactFormRComponent', () => {
  let component: ContactFormRComponent;
  let fixture: ComponentFixture<ContactFormRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFormRComponent]
    });
    fixture = TestBed.createComponent(ContactFormRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
