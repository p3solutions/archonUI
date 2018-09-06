import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from './change-password.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let testBedService: any;
  const getSimpleObservable = function(data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };

  const disposeMe = new Map();
  const getJobList = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('getJobList', pvtObservable.subscribe());
    return pvtObservable;
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        // reference the new instance of formBuilder from above
        ChangePasswordService,
        JwtHelper,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    component.changePasswordForm = formBuilder.group({
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
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

});
