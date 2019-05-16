import { async, ComponentFixture, TestBed, inject, flushMicrotasks, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from './change-password.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatError, MatFormFieldModule } from '@angular/material';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let testBedService: any;
  const getSimpleObservable = function (data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };
  const disposeMe = new Map();
  const changePassword = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('changePassword', pvtObservable.subscribe());
    return pvtObservable;
  };
  const response = { success: true, httpStatus: 200 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule, MatFormFieldModule
      ],
      providers: [
        // reference the new instance of formBuilder from above
        ChangePasswordService,
        UserinfoService,
        JwtHelperService,
        { provide: FormBuilder, useValue: formBuilder } , 
        { provide: EnvironmentService, useClass: MockEnvironmentService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    component.changePasswordForm = formBuilder.group({
      oldPassword: 123456,
      newPassword: 123456,
      confirmPassword: 123456
    });
    fixture.detectChanges();
    testBedService = TestBed.get(ChangePasswordService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ChangePasswordService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ChangePasswordService], (injectService: ChangePasswordService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  // xit('Should get change password success when changeUserPassword() is called', fakeAsync(() => {
  //   expect(component.inProgress).toBeFalsy();
  //   spyOn(testBedService, 'changePassword').and.returnValue(changePassword(response));
  //   component.changeUserPassword();
  //   flushMicrotasks();
  //   fixture.detectChanges();
  //   expect(component.inProgress).toBeTruthy();
  //   testBedService.changePassword().subscribe(res => {
  //     expect(res).toEqual(response);
  //   });
  //   disposeMe.get('changePassword').unsubscribe();
  // }));

});
