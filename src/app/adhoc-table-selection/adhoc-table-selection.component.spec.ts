import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocTableSelectionComponent } from './adhoc-table-selection.component';

describe('AdhocTableSelectionComponent', () => {
  let component: AdhocTableSelectionComponent;
  let fixture: ComponentFixture<AdhocTableSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocTableSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocTableSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
