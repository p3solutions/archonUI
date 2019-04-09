import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleGroupConfigurationComponent } from './role-group-configuration.component';
import { ConfigurationService } from '../configuration/configuration.service';
import { MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageUserRolesService } from '../manage-user-roles/manage-user-roles.service';
import { UserinfoService } from '../userinfo.service';

describe('RoleGroupConfigurationComponent', () => {
  let component: RoleGroupConfigurationComponent;
  let fixture: ComponentFixture<RoleGroupConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoleGroupConfigurationComponent],
      imports: [RouterTestingModule, FormsModule, MatTableModule,
        ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        RouterTestingModule, HttpClientTestingModule, MatCheckboxModule],
      providers: [
        ManageUserRolesService,
        ConfigurationService,
        UserinfoService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleGroupConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
