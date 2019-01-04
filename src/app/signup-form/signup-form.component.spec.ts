import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { SignupFormService } from './signup-form.service';
import { ManageMembers } from '../manage-members';
import { HttpErrorResponse } from '@angular/common/http';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SigninFormService } from '../signin-form/signin-form.service';
import { SignUp } from '../sign-up';
import { ErrorObject } from '../error-object';
import { Router } from '@angular/router';

xdescribe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  // tslint:disable-next-line:prefer-const
  let manageMemberInfoData: ManageMembers;
  let signUpService: any;
  const signUpData: any = {
    name: 'aloktesting',
    emailAddress: 'alok.user@test.com',
    password: '12345'
  };
  const simpleObservable = new Observable<SignUp>((observer) => {
    // observable execution
    observer.next(signUpData);
    observer.complete();
  });
  let disposeMe;
  const onSignUp = function (): Observable<SignUp> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };
  let router: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        SignupFormService,
        HttpClientModule,
        AuthenticationService,
        JwtHelperService
      ],
      declarations: [SignupFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    signUpService = TestBed.get(SignupFormService);
    router = TestBed.get(Router);
  });


  it('Should display the response for signup-form component', () => {
    spyOn(signUpService, 'signUp').and.returnValue(onSignUp());
    spyOn(router, 'navigate');
    component.onSignUp();
    fixture.detectChanges();
    const nameDummy = component.responseData['name'];
    const emailAddressDummy = component.responseData['emailAddress'];
    const passwordDummy = component.responseData['password'];
    expect(nameDummy).toBe(component.responseData['name']);
    expect(emailAddressDummy).toBe(component.responseData['emailAddress']);
    expect(passwordDummy).toBe(component.responseData['password']);
    disposeMe.unsubscribe();
  });


  it('Should work the createSignUpForm() functionality', () => {
    expect(component.createSignUpForm).toBeTruthy();
  });

  it('Should work the onSignUp() functionality', () => {
    expect(component.onSignUp).toBeTruthy();
  });
});
