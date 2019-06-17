import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtJobsConfigComponent } from './ert-jobs-config.component';
import { ErtService } from '../ert-landing-page/ert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { MatFormFieldModule, MatTooltipModule, MatCardModule, MatInputModule } from '@angular/material';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ErtJobsConfigComponent', () => {
  let component: ErtJobsConfigComponent;
  let fixture: ComponentFixture<ErtJobsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtJobsConfigComponent],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule,
        HttpClientModule, MatFormFieldModule, MatTooltipModule, MatCardModule],
      providers: [ErtService, WorkspaceHeaderService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtJobsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
