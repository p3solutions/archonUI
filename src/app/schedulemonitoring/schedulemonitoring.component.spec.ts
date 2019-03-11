import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulemonitoringComponent } from './schedulemonitoring.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { UserProfileService } from '../user-profile/user-profile.service';

describe('SchedulemonitoringComponent', () => {
  let component: SchedulemonitoringComponent;
  let fixture: ComponentFixture<SchedulemonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulemonitoringComponent , NavbarComponent],
      imports: [DataTablesModule, RouterTestingModule, HttpClientTestingModule, HttpClientModule],
      providers: [UserinfoService, UserProfileService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulemonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
