import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkspaceComponent } from './new-workspace.component';
import { FormsModule } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserWorkspaceService } from '../user-workspace.service';
import { CommonUtilityService } from '../common-utility.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('NewWorkspaceComponent', () => {
  let component: NewWorkspaceComponent;
  let fixture: ComponentFixture<NewWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWorkspaceComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [UserinfoService, UserWorkspaceService, CommonUtilityService, WorkspaceHeaderService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const button = fixture.debugElement.nativeElement.querySelector('#cancel-btn');
    button.click();
  });
});
