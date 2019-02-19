import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCarouselComponent } from './sales-carousel.component';

describe('SalesCarouselComponent', () => {
  let component: SalesCarouselComponent;
  let fixture: ComponentFixture<SalesCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
