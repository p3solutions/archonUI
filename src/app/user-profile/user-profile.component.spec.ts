import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { WorkspaceListService } from '../workspace-list/workspace-list.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserProfileService } from './user-profile.service';
import { ChangePasswordService } from '../change-password/change-password.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent, EditProfileComponent, NavbarComponent, ChangePasswordComponent ],
      providers: [UserinfoService, WorkspaceListService, WorkspaceHeaderService, UserProfileService, ChangePasswordService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
