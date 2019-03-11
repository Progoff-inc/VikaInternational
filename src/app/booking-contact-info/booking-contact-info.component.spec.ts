import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingContactInfoComponent } from './booking-contact-info.component';

describe('BookingContactInfoComponent', () => {
  let component: BookingContactInfoComponent;
  let fixture: ComponentFixture<BookingContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
