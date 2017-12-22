import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { SignupFormService } from './signup-form.service';
import { ManageMembers } from '../managemembers';

import { ManageMembersService } from '../manage-members.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { SigninFormService } from '../signin-form/signin-form.service';
import { Signup } from '../signup';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  // tslint:disable-next-line:prefer-const
  let manageMemberInfoData: ManageMembers;
  let de: DebugElement;
  let signUpService: any;
  const signUpData: any = {
    name: '',
    emailAddress: '',
    password: ''
  };
  const simpleObservable = new Observable<Signup>((observer) => {
    // observable execution
    observer.next(signUpData);
    observer.complete();
  });
  let disposeMe;
  const onSignUp = function (): Observable<Signup> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

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
        JwtHelper
      ],
      declarations: [ SignupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // de = fixture.debugElement.query(By.css('#manage-members-info-table'));
    // let btn = fixture.debugElement.query(By.css('span'));
    // ManageMembersInfoTag = de.nativeElement;
    signUpService = TestBed.get(SignupFormService);

  });

  it('Should display the response for signup-form component', () => {
    spyOn(signUpService, 'signUp').and.returnValue(onSignUp);
    console.log(component.onSignUp);
    // component.getManageMembersData();
    fixture.detectChanges();
    // const rowArray: NodeListOf<Element> = ManageMembersInfoTag.querySelectorAll('.mm-info-data');
    // // while spying on real service, mocked info is returned
    // console.log(rowArray[0], component.manageMembersRequestData);
    // const sl_no = rowArray[0];
    // const member = rowArray[1];
    // const role = rowArray[2];

    // expect(sl_no.textContent.trim()).toBe(component.manageMembersRequestData[0].sl_no);
    // expect(member.textContent.trim()).toBe(component.manageMembersRequestData[0].member);
    // expect(role.textContent.trim()).toBe(component.manageMembersRequestData[0].role);

  });


  it('Should work the createSignUpForm() functionality', () => {
    expect(component.createSignUpForm).toBeTruthy();
  });

  it('Should work the onSignUp() functionality', () => {
    expect(component.onSignUp).toBeTruthy();
  });
});
