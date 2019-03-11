import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPayDeliveryComponent } from './booking-pay-delivery.component';

describe('BookingPayDeliveryComponent', () => {
  let component: BookingPayDeliveryComponent;
  let fixture: ComponentFixture<BookingPayDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPayDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPayDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
