import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocLandingPageComponent } from './adhoc-landing-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

describe('AdhocLandingPageComponent', () => {
  let component: AdhocLandingPageComponent;
  let fixture: ComponentFixture<AdhocLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocLandingPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgxSpinnerModule],
      providers: [UserinfoService, NgxSpinnerService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocLandingPageComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
