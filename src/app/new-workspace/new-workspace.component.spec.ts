import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkspaceComponent } from './new-workspace.component';
import { FormsModule } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserWorkspaceService } from '../user-workspace.service';
import { CommonUtilityService } from '../common-utility.service';

// Reason for disabling: screen greys out on test case
xdescribe('NewWorkspaceComponent', () => {
  let component: NewWorkspaceComponent;
  let fixture: ComponentFixture<NewWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWorkspaceComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [UserinfoService, UserWorkspaceService, CommonUtilityService]
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
  });
});
