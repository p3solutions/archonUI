import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StoredProcViewComponent } from './stored-proc-view.component';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { StoredProcViewService } from './stored-proc-view.service';
import { FormsModule } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceObject } from '../workspace-objects';

xdescribe('StoredProcViewComponent', () => {
  let component: StoredProcViewComponent;
  let fixture: ComponentFixture<StoredProcViewComponent>;
  let service: WorkspaceHeaderService;
  let workspace:WorkspaceObject={
    id: +"5c49503153a7a476719e84bd",
     createdAt: 1548308529,
     updatedAt:  1548308529,
      workspaceName:  "New Workspace", 
      masterMetadataVersion: 22,
      databases:[{
      id: "5c384606d9cb1c18411001c9",
      name: "ARCHON_DEMO_DB",
      type: "MYSQL"}],
      members:[],
      owner:null,
      softDeleted:false,
      workspaceRole:null,
      workspaceState:"Pending",
      loggedInUserRole:null,
      lastUpdatedTime:null,
      databaseList:[]
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoredProcViewComponent],
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      providers: [WorkspaceHeaderService, UserinfoService, StoredProcViewService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredProcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    service = TestBed.get(WorkspaceHeaderService);
    
  });
});
