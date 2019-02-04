import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtLandingPageComponent } from './ert-landing-page.component';

describe('ErtLandingPageComponent', () => {
  let component: ErtLandingPageComponent;
  let fixture: ComponentFixture<ErtLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
