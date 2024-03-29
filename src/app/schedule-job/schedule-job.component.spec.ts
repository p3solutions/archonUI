import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleJobComponent } from './schedule-job.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { UserinfoService } from '../userinfo.service';
import { TableListService } from '../table-list/table-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule,
  MatOptionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ScheduleJobComponent', () => {
  let component: ScheduleJobComponent;
  let fixture: ComponentFixture<ScheduleJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule , HttpClientTestingModule, RouterTestingModule, BsDatepickerModule.forRoot(), TimepickerModule.forRoot(), MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule],
      declarations: [ ScheduleJobComponent ],
      providers: [ UserinfoService, TableListService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
