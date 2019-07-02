import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DbExtractorComponent } from './db-extractor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DbExtractorService } from './db-extractor.service';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { MatFormFieldModule, MatSelectModule, MatInputModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { CommonModule } from '@angular/common';

describe('DbExtractorComponent', () => {
  let component: DbExtractorComponent;
  let fixture: ComponentFixture<DbExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbExtractorComponent],
      imports: [HttpClientModule, RouterTestingModule, MatFormFieldModule, MatSelectModule, CommonModule,
        MatButtonToggleModule, MatInputModule, BrowserAnimationsModule, MatInputModule, FormsModule, ReactiveFormsModule],
      providers: [DbExtractorService, UserinfoService, WorkspaceHeaderService,
        { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
