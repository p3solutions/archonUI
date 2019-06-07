import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSearchCriteriaComponent } from './adhoc-search-criteria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule,
  MatCardModule, MatTreeModule, MatRadioModule, MatExpansionModule, MatTabsModule, MatCheckboxModule, MatDatepickerModule
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
import { AdhocHeaderInfo } from '../adhoc-landing-page/adhoc';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
describe('AdhocSearchCriteriaComponent', () => {
  let component: AdhocSearchCriteriaComponent;
  let fixture: ComponentFixture<AdhocSearchCriteriaComponent>;
  const adhocHeaderInfo = new AdhocHeaderInfo();
  adhocHeaderInfo.appName = 'app 1';
  adhocHeaderInfo.metadataVersion = '1';
  adhocHeaderInfo.screenName = 'Screen 1';
  adhocHeaderInfo.workspaceId = '12ddwdqwe';
  adhocHeaderInfo.workspaceName = 'workspace';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocSearchCriteriaComponent, AdhocSearchPanelComponent,
        AdhocSearchScreenComponent, AdhocEditPanelColumnPopupComponent,
        AdhocEditSearchScreenPopupComponent],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatTreeModule, MatRadioModule, MatExpansionModule
        , MatOptionModule, RouterTestingModule, HttpClientTestingModule, MatDatepickerModule, MatCheckboxModule,
        MatSelectModule, MatInputModule, DragDropModule, MatCheckboxModule, MatTabsModule, BrowserAnimationsModule],
      providers: [UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocSearchCriteriaComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(AdhocService);
    spyOn(WHS, 'updatedAdhocHeaderInfo').and.returnValue(adhocHeaderInfo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
