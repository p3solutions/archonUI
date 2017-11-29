import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordFormComponent } from './forgotpassword-form.component';

describe('ForgotpasswordFormComponent', () => {
  let component: ForgotpasswordFormComponent;
  let fixture: ComponentFixture<ForgotpasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
