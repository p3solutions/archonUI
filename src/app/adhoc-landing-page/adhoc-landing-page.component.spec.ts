import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocLandingPageComponent } from './adhoc-landing-page.component';

describe('AdhocLandingPageComponent', () => {
  let component: AdhocLandingPageComponent;
  let fixture: ComponentFixture<AdhocLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
