import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErtJobsComponent } from './ert-jobs.component';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { ScheduleJobComponent } from '../schedule-job/schedule-job.component';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatSelectModule,
  MatOptionModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ErtJobsComponent', () => {
  let component: ErtJobsComponent;
  let fixture: ComponentFixture<ErtJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtJobsComponent, ScheduleJobComponent],
      providers: [UserinfoService, WorkspaceHeaderService, ErtService],
      imports: [HttpClientModule, RouterTestingModule, BsDatepickerModule.forRoot(), TimepickerModule.forRoot(), FormsModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtJobsComponent);
    component = fixture.componentInstance;
    const UIS = TestBed.get(UserinfoService);
    spyOn(UIS, 'getUserId').and.returnValue('');
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
