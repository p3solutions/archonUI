import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorLastStepComponent } from './db-extractor-last-step.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ProcessDetailsObj } from '../db-extractor';

describe('DbExtractorLastStepComponent', () => {
  let component: DbExtractorLastStepComponent;
  let fixture: ComponentFixture<DbExtractorLastStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbExtractorLastStepComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [UserinfoService, WorkspaceHeaderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorLastStepComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getDatabaseID').and.returnValue(WHS.getDatabaseID);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
