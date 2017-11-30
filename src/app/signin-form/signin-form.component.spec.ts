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
      declarations: [ SigninFormComponent ],
      providers : [SigninFormService,HttpClient,HttpHandler],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
