import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulemonitoringComponent } from './schedulemonitoring.component';

describe('SchedulemonitoringComponent', () => {
  let component: SchedulemonitoringComponent;
  let fixture: ComponentFixture<SchedulemonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulemonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulemonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
