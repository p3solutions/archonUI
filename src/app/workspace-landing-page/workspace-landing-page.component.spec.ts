import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceLandingPageComponent } from './workspace-landing-page.component';

xdescribe('WorkspaceLandingPageComponent', () => {
  let component: WorkspaceLandingPageComponent;
  let fixture: ComponentFixture<WorkspaceLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
