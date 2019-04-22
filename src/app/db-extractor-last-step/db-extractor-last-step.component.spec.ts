import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { DbExtractorLastStepComponent } from './db-extractor-last-step.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { DbExtractorService } from '../db-extractor/db-extractor.service';
import { ScheduleJobComponent } from '../schedule-job/schedule-job.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { MatSelectModule,
  MatOptionModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DbExtractorLastStepComponent', () => {
  let component: DbExtractorLastStepComponent;
  let fixture: ComponentFixture<DbExtractorLastStepComponent>;
  // const data = '';
  // const getSimpleObservable = function (data) {
  //   return new Observable<any>((observer) => {
  //     observer.next(data); // observable execution
  //     observer.complete();
  //   });
  // };
  // const disposeMe = new Map();
  // const getDBInfoByID = function (data): Observable<any> {
  //   const pvtObservable = getSimpleObservable(data);
  //   disposeMe.set('getDatabaseID', pvtObservable.subscribe());
  //   return pvtObservable;
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbExtractorLastStepComponent, ScheduleJobComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule, BsDatepickerModule.forRoot(), TimepickerModule.forRoot(),MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, BrowserAnimationsModule],
      providers: [UserinfoService, WorkspaceHeaderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorLastStepComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getDatabaseID').and.returnValue('');
    const dbs = TestBed.get(DbExtractorService);
    spyOn(dbs, 'getProcessDetailsObj').and.returnValue('');
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
