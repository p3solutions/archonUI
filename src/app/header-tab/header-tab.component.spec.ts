import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTabComponent } from './header-tab.component';
import { AddMembersComponent } from '../add-members/add-members.component';
import { ManageMembersComponent } from '../manage-members/manage-members.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AddMembersService } from '../add-members/add-members.service';

xdescribe('HeaderTabComponent', () => {
  let component: HeaderTabComponent;
  let fixture: ComponentFixture<HeaderTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        HeaderTabComponent,
        ManageMembersComponent,
        AddMembersComponent
      ],
      providers: [
        ManageMembersService,
        AddMembersService,
        UserinfoService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
