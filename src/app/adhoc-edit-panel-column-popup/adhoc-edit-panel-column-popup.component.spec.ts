import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocEditPanelColumnPopupComponent } from './adhoc-edit-panel-column-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { AceEditorModule } from 'ng2-ace-editor';

describe('AdhocEditPanelColumnPopupComponent', () => {
  let component: AdhocEditPanelColumnPopupComponent;
  let fixture: ComponentFixture<AdhocEditPanelColumnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocEditPanelColumnPopupComponent],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, AceEditorModule,
        MatOptionModule, MatSelectModule, MatInputModule, MatRadioModule, MatCheckboxModule, BrowserAnimationsModule],
      providers: [{ provide: EnvironmentService, useClass: MockEnvironmentService }]
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
