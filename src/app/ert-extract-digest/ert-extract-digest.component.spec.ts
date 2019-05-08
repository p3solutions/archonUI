import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtExtractDigestComponent } from './ert-extract-digest.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonUtilityService } from '../common-utility.service';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ErtExtractDigestComponent', () => {
  let component: ErtExtractDigestComponent;
  let fixture: ComponentFixture<ErtExtractDigestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtExtractDigestComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [CommonUtilityService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtExtractDigestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
