import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtCharReplacementComponent } from './ert-char-replacement.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErtCharReplacementComponent', () => {
  let component: ErtCharReplacementComponent;
  let fixture: ComponentFixture<ErtCharReplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtCharReplacementComponent],
      providers: [UserinfoService, WorkspaceHeaderService],
      imports: [FormsModule, MatTableModule, HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtCharReplacementComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
