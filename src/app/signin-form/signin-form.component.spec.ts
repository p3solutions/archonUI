import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser'; 
import {ComponentFixtureAutoDetect} from '@angular/core/testing';
import { SigninFormComponent } from './signin-form.component';
import { SigninFormService} from '../signin-form.service';
import {HttpClient,HttpHeaders,HttpHandler} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
describe('SigninFormComponent', () => {
  let component: SigninFormComponent;
  let fixture: ComponentFixture<SigninFormComponent>;
   let de : DebugElement;
  let el : HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ SigninFormComponent ],
      providers : [SigninFormService,HttpClient,HttpHandler],
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
    expect(component).toBeTruthy();
  });
  it('is Form title as Sign In',() =>{
      fixture = TestBed.createComponent(SigninFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.x_title'));
      el = de.nativeElement;
      expect(el.textContent).toContain('Sign In');
  });

  it('form invalid when empty', () => {
  expect(component.form.valid).toBeFalsy();
});

  it('email field validity', () => {
    let errors = {};
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

    it('password field validity', () => {
    let errors = {};
    let password = component.form.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set email to something correct
    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

});


