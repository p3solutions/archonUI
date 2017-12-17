import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SigninFormComponent } from './signin-form.component';
import { SigninFormService } from './signin-form.service';

describe('SigninFormComponent', () => {
  let component: SigninFormComponent;
  let fixture: ComponentFixture<SigninFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigninFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',
    inject([SigninFormService], (signInService: SigninFormService) => {
      expect(component).toBeTruthy();
    }));
});
