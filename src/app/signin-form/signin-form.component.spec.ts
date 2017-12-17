import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SigninFormComponent } from './signin-form.component';
import { SigninFormService } from './signin-form.service';

xdescribe('SigninFormComponent', () => {
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

<<<<<<< HEAD
  it('should create',
    inject([SigninFormService], (signInService: SigninFormService) => {
      expect(component).toBeTruthy();
    }));
=======
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
>>>>>>> 832b9087f272d09ac707330e12a5b659732eaed3
});
