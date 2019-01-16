import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordFormComponent } from './forgotpassword-form.component';
import { ForgotpasswordFormService } from './forgotpassword-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageMembers } from '../manage-members';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ForgotpasswordFormComponent', () => {
  let component: ForgotpasswordFormComponent;
  let fixture: ComponentFixture<ForgotpasswordFormComponent>;
  let de: DebugElement;
  let input: HTMLElement;
  let forgotpasswordFormService: any;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ForgotpasswordFormComponent],
      providers: [
        RouterTestingModule,
        ForgotpasswordFormService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('input'));
    input = de.nativeElement;
    forgotpasswordFormService = TestBed.get(ForgotpasswordFormService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Should work onForgotPassword functionality', () => {
    expect(component.onForgotPassword).toBeTruthy();
  });

});
