import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from './change-password.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

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
      firstName: null,
      lastName: null
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
