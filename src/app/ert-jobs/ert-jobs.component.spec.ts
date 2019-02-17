import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErtJobsComponent } from './ert-jobs.component';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';

describe('ErtJobsComponent', () => {
  let component: ErtJobsComponent;
  let fixture: ComponentFixture<ErtJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtJobsComponent],
      providers: [UserinfoService, WorkspaceHeaderService, ErtService],
      imports: [HttpClientModule, RouterTestingModule]
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
