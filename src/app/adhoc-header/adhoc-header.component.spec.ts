import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocHeaderComponent } from './adhoc-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserinfoService } from '../userinfo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

describe('AdhocHeaderComponent', () => {
  let component: AdhocHeaderComponent;
  let fixture: ComponentFixture<AdhocHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocHeaderComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgxSpinnerModule],
      providers: [UserinfoService, NgxSpinnerService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocHeaderComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
