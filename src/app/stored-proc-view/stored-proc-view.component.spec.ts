import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StoredProcViewComponent } from './stored-proc-view.component';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { StoredProcViewService } from './stored-proc-view.service';
import { FormsModule } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';
import { TableListService } from '../table-list/table-list.service';

describe('StoredProcViewComponent', () => {
  let component: StoredProcViewComponent;
  let fixture: ComponentFixture<StoredProcViewComponent>;
  let service: WorkspaceHeaderService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoredProcViewComponent],
      imports: [HttpClientModule, RouterTestingModule, FormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule],
      providers: [WorkspaceHeaderService, UserinfoService, StoredProcViewService, TableListService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredProcViewComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    service = TestBed.get(WorkspaceHeaderService);
  });
});
