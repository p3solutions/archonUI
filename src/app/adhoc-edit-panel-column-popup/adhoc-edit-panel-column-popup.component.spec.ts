import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocEditPanelColumnPopupComponent } from './adhoc-edit-panel-column-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdhocEditPanelColumnPopupComponent', () => {
  let component: AdhocEditPanelColumnPopupComponent;
  let fixture: ComponentFixture<AdhocEditPanelColumnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocEditPanelColumnPopupComponent],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatOptionModule, MatSelectModule, MatInputModule, BrowserAnimationsModule]
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
