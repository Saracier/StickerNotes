import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormTdComponent } from './contact-form-td.component';

describe('ContactFormTdComponent', () => {
  let component: ContactFormTdComponent;
  let fixture: ComponentFixture<ContactFormTdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFormTdComponent]
    });
    fixture = TestBed.createComponent(ContactFormTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
