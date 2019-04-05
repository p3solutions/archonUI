import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSigninFormComponent } from './sso-signin-form.component';

describe('SsoSigninFormComponent', () => {
  let component: SsoSigninFormComponent;
  let fixture: ComponentFixture<SsoSigninFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSigninFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
