import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtTableColumnConfigComponent } from './ert-table-column-config.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';

describe('ErtTableColumnConfigComponent', () => {
  let component: ErtTableColumnConfigComponent;
  let fixture: ComponentFixture<ErtTableColumnConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtTableColumnConfigComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [UserinfoService, WorkspaceHeaderService, ErtService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtTableColumnConfigComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceName').and.returnValue('');
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
