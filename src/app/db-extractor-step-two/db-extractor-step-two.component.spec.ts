import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorStepTwoComponent } from './db-extractor-step-two.component';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProcessDetailsObj } from '../db-extractor';
import { DbExtractorService } from '../db-extractor/db-extractor.service';

describe('DbExtractorStepTwoComponent', () => {
  let component: DbExtractorStepTwoComponent;
  let fixture: ComponentFixture<DbExtractorStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorStepTwoComponent ],
      imports: [FormsModule,RouterTestingModule, HttpClientModule],
      providers: [UserinfoService, DbExtractorService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
