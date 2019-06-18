import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLandingPageComponent } from './activity-landing-page.component';

describe('ActivityLandingPageComponent', () => {
  let component: ActivityLandingPageComponent;
  let fixture: ComponentFixture<ActivityLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
