import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtSipConfigComponent } from './ert-sip-config.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { TableListService } from '../table-list/table-list.service';
import { UserinfoService } from '../userinfo.service';

describe('ErtSipConfigComponent', () => {
  let component: ErtSipConfigComponent;
  let fixture: ComponentFixture<ErtSipConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtSipConfigComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [WorkspaceHeaderService, ErtService, TableListService, UserinfoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtSipConfigComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
