import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocEditPanelColumnPopupComponent } from './adhoc-edit-panel-column-popup.component';

describe('AdhocEditPanelColumnPopupComponent', () => {
  let component: AdhocEditPanelColumnPopupComponent;
  let fixture: ComponentFixture<AdhocEditPanelColumnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocEditPanelColumnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocEditPanelColumnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
