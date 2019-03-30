import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocEditSearchScreenPopupComponent } from './adhoc-edit-search-screen-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AdhocEditSearchScreenPopupComponent', () => {
  let component: AdhocEditSearchScreenPopupComponent;
  let fixture: ComponentFixture<AdhocEditSearchScreenPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocEditSearchScreenPopupComponent ],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatOptionModule, MatSelectModule, MatInputModule, MatRadioModule, MatCheckboxModule, BrowserAnimationsModule]
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