import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtTableComponent } from './ert-table.component';

describe('ErtTableComponent', () => {
  let component: ErtTableComponent;
  let fixture: ComponentFixture<ErtTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
