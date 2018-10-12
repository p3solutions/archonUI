import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterNewpasswordComponent } from './enter-newpassword.component';
import { EnterNewpasswordService } from './enter-newpassword.service';
import { PasswordReset } from './password-reset';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ErrorObject } from '../error-object';
import { TestabilityRegistry } from '@angular/core/src/testability/testability';
import { HttpClient } from 'selenium-webdriver/http';
// fdescribe used to run single testcase only
// whenever we using fdescribe u should create it as fit
xdescribe('EnterNewpasswordComponent', () => {
  let component: EnterNewpasswordComponent;
  let fixture: ComponentFixture<EnterNewpasswordComponent>;
  let passwordResetService: EnterNewpasswordService;
  const passwordResetData: any = {
    resetKey : '5a422b025912213155a768341140472627094608',
    password : 'archon'
  };
  const simpleObservable = new Observable<PasswordReset>((observer) => {
    // observable execution
    observer.next(passwordResetData);
    observer.complete();
  });
  let disposeMe;
  const onSubmit = function (): Observable<PasswordReset> {
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
        EnterNewpasswordService,
        HttpClientModule,
      ],
      declarations: [ EnterNewpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterNewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    passwordResetService = TestBed.get(EnterNewpasswordService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should work the onSignUp() functionality', () => {
    expect(component.onSubmit).toBeTruthy();
  });
  it('Should display the response for enter-new password component', () => {
    spyOn(passwordResetService, 'passwordReset').and.returnValue(onSubmit());
    component.onSubmit();
    fixture.detectChanges();
   const passwordDummy = component.responseData['password'];
    expect(passwordDummy).toBe(component.responseData['password']);
  });

});
