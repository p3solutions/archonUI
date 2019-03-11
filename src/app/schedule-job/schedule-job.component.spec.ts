import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleJobComponent } from './schedule-job.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';

describe('ScheduleJobComponent', () => {
  let component: ScheduleJobComponent;
  let fixture: ComponentFixture<ScheduleJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule , BsDatepickerModule.forRoot(), TimepickerModule.forRoot()],
      declarations: [ ScheduleJobComponent ]
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
