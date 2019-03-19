import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSearchCriteriaComponent } from './adhoc-search-criteria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule,
  MatCardModule, MatTreeModule, MatRadioModule, MatExpansionModule, MatTabsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdhocSearchPanelComponent } from '../adhoc-search-panel/adhoc-search-panel.component';
import { AdhocEditPanelColumnPopupComponent } from '../adhoc-edit-panel-column-popup/adhoc-edit-panel-column-popup.component';
import { AdhocSearchScreenComponent } from '../adhoc-search-screen/adhoc-search-screen.component';
import { AdhocEditSearchScreenPopupComponent } from '../adhoc-edit-search-screen-popup/adhoc-edit-search-screen-popup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserinfoService } from '../userinfo.service';
describe('AdhocSearchCriteriaComponent', () => {
  let component: AdhocSearchCriteriaComponent;
  let fixture: ComponentFixture<AdhocSearchCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocSearchCriteriaComponent, AdhocSearchPanelComponent,
        AdhocSearchScreenComponent, AdhocEditPanelColumnPopupComponent,
        AdhocEditSearchScreenPopupComponent],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatTreeModule, MatRadioModule, MatExpansionModule
        , MatOptionModule, RouterTestingModule, HttpClientTestingModule,
        MatSelectModule, MatInputModule, DragDropModule, MatTabsModule, BrowserAnimationsModule],
      providers: [UserinfoService]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
