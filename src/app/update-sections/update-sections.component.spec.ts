import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSectionsComponent } from './update-sections.component';

describe('UpdateSectionsComponent', () => {
  let component: UpdateSectionsComponent;
  let fixture: ComponentFixture<UpdateSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
