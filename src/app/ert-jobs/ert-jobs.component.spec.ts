import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtJobsComponent } from './ert-jobs.component';

describe('ErtJobsComponent', () => {
  let component: ErtJobsComponent;
  let fixture: ComponentFixture<ErtJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
