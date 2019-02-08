import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtJobsConfigComponent } from './ert-jobs-config.component';

describe('ErtJobsConfigComponent', () => {
  let component: ErtJobsConfigComponent;
  let fixture: ComponentFixture<ErtJobsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtJobsConfigComponent ]
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
