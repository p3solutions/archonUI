import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceLandingPageComponent } from './workspace-landing-page.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { InfoService } from '../info.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Info } from '../info';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

describe('WorkspaceLandingPageComponent', () => {
  let component: WorkspaceLandingPageComponent;
  let fixture: ComponentFixture<WorkspaceLandingPageComponent>;
  let infoService: any;

  // mock data
  const info: any = { id: 11, username: 'deepak', role: 'Member' };
  const simpleObservable = new Observable<Info>((observer) => {
    observer.next(info);
    observer.complete();
  });
  let disposeMe;
  const getInfo = function (): Observable<Info> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule],
      providers: [RouterTestingModule, InfoService, NgxSpinnerService, WorkspaceServicesService,
        HttpClientTestingModule, UserProfileService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      declarations: [WorkspaceLandingPageComponent, NavbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceLandingPageComponent);
    component = fixture.componentInstance;
    infoService = TestBed.get(InfoService);
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
