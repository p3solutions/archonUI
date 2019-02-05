import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERTComponent } from './ert.component';

describe('ERTComponent', () => {
  let component: ERTComponent;
  let fixture: ComponentFixture<ERTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
