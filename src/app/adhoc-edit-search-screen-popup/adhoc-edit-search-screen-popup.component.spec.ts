import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocEditSearchScreenPopupComponent } from './adhoc-edit-search-screen-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { AceEditorModule } from 'ng2-ace-editor';
describe('AdhocEditSearchScreenPopupComponent', () => {
  let component: AdhocEditSearchScreenPopupComponent;
  let fixture: ComponentFixture<AdhocEditSearchScreenPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocEditSearchScreenPopupComponent],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, AceEditorModule,
        MatOptionModule, MatSelectModule, MatInputModule, MatRadioModule, MatCheckboxModule, BrowserAnimationsModule],
      providers: [{ provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocEditSearchScreenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
