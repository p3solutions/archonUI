import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { SigninFormComponent } from './signin-form.component';
import { SigninFormService } from '../signin-form.service';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninForm } from '../signin-form';
describe('SigninFormComponent', () => {
  let component: SigninFormComponent;
  let fixture: ComponentFixture<SigninFormComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [SigninFormComponent],
      providers: [SigninFormService, HttpClient, HttpHandler],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    // signinService = fixture.debugElement.injector.get(SigninFormService);

  });

  it('should create', () => {
    // is Sigin-Form Component available?
    expect(component).toBeTruthy();
  });

  // it('form invalid when empty', () => {
  //   // Entire form validation
  //   expect(component.form.valid).toBeFalsy();
  // });

  // it('email field validity', () => {
  //   let errors = {};
  //   let email = component.form.controls['email'];
  //   expect(email.valid).toBeFalsy();

  //   // Email field is required
  //   errors = email.errors || {};
  //   expect(errors['required']).toBeTruthy();

  //   // Set email to something
  //   email.setValue("chandru");
  //   errors = email.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['pattern']).toBeTruthy();

  //   // Set email to something correct
  //   email.setValue("chandru@platform3solutions.com");
  //   errors = email.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['pattern']).toBeFalsy();
  // });

  // it('password field validity', () => {
  //   let errors = {};
  //   let password = component.form.controls['password'];

  //   // Email field is required
  //   errors = password.errors || {};
  //   expect(errors['required']).toBeTruthy();

  //   // Set email to something
  //   password.setValue("ashwin");
  //   errors = password.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['minlength']).toBeTruthy();

  //   // Set email to something correct
  //   password.setValue("chandruashwin");
  //   errors = password.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['minlength']).toBeFalsy();
  // });

  // it('submitting a form emits a user', () => {
  //   expect(component.form.valid).toBeFalsy();
  //   component.form.controls['email'].setValue("chandru@platform3solutions.com");
  //   component.form.controls['password'].setValue("chandruashwin");
  //   expect(component.form.valid).toBeTruthy();

  //   let signinform: SigninForm;

  //   // component.loggedIn.subscribe((value) => signinform = value);
  //   signinform = component.signinDetails;

  //   // Trigger the login function
  //   component.login();

  //   // Now we can check to make sure the emitted value is correct
  //   expect(signinform.email).toBe("chandru@platform3solutions.com");
  //   expect(signinform.password).toBe("chandruashwin");
  // });

});

