import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { SignupFormService } from './signup-form.service';
import { ManageMembers } from '../managemembers';
// import { WorkspaceInfoComponent } from './workspace-info.component';
// import { WorkspaceinfoService } from '../workspaceinfo.service';
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

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  // tslint:disable-next-line:prefer-const
  let manageMemberInfoData: ManageMembers;
  let de: DebugElement;
  let btn: DebugElement;
  let ManageMembersInfoTag: HTMLElement;
  let signUpService: any;
  const managemembers1: any = {
    name: '',
    emailAddress: '',
    password: ''
  };
  const simpleObservable = new Observable<ManageMembers>((observer) => {
    // observable execution
    observer.next(managemembers1);
    observer.complete();
  });
  let disposeMe;
  const getManageMembersData = function (): Observable<ManageMembers> {
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

  
  it('Should work the createSignUpForm() functionality', () => {
    expect(component.createSignUpForm).toBeTruthy();
  });

  it('Should work the onSignUp() functionality', () => {
    expect(component.onSignUp).toBeTruthy();
  });
});
