import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtLandingPageComponent } from './ert-landing-page.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ManageMasterMetadataService } from '../manage-master-metadata/manage-master-metadata.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

describe('ErtLandingPageComponent', () => {
  let component: ErtLandingPageComponent;
  let fixture: ComponentFixture<ErtLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtLandingPageComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientModule, NgxSpinnerModule],
      providers: [UserinfoService, WorkspaceHeaderService, NgxSpinnerService,
        ManageMasterMetadataService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtLandingPageComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceName').and.returnValue('');
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
