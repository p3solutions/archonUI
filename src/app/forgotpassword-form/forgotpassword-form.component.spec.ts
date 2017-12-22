import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ForgotpasswordFormComponent } from './forgotpassword-form.component';
import { SignInService } from '../sign-in.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageMembers } from '../managemembers';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
// import { WorkspaceInfoComponent } from './workspace-info.component';
// import { WorkspaceinfoService } from '../workspaceinfo.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

xdescribe('ForgotpasswordFormComponent', () => {
  let component: ForgotpasswordFormComponent;
  let fixture: ComponentFixture<ForgotpasswordFormComponent>;
  // tslint:disable-next-line:prefer-const
  let manageMemberInfoData: ManageMembers;
  let de: DebugElement;
  let btn: DebugElement;
  let ManageMembersInfoTag: HTMLElement;
  let manageMembersService: any;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ForgotpasswordFormComponent],
      providers: [
        SignInService,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordFormComponent);
    component = fixture.componentInstance;
    // de = fixture.debugElement.query(By.css('#manage-members-info-table'));
    let input = fixture.debugElement.query(By.css('input'));
    // ManageMembersInfoTag = de.nativeElement;
    manageMembersService = TestBed.get(SignInService);
  });

  it('Should work onForgotPassword functionality', () => {
    // let btn = fixture.debugElement.query(By.css('button'));
    // btn.triggerEventHandler('click', null);
    console.log('forgot pass', this.input);
    expect(component.onForgotPassword).toBeTruthy();
  });

});

