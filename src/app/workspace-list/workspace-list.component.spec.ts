import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { WorkspaceListComponent } from './workspace-list.component';
import { WorkspaceListService } from './workspace-list.service';
xdescribe('WorkspaceListComponent', () => {
  let component: WorkspaceListComponent;
  let fixture: ComponentFixture<WorkspaceListComponent>;
  let de: DebugElement;
  let workspaceListHTMLTag: HTMLElement;
  let workspaceListService: any;
  const workspaceListInfo = {
    'data': {
      'workspaces': [
        {
          id: '5a55c85d9d226c08140a90d6',
          createdAt: 1515571293,
          updatedAt: 1515578378,
          workspaceName: 'Workspace 1',
          owner: {
            'id': '5a535cbb9d226c1a4c946607',
            'name': 'alok'
          },
          masterMetadataVersion: 22,
          databases: [{
            'id': '5a533baec7b4d489ed715b85',
            'name': 'SQL_DB_NAME',
            'type': 'SQL'
          },
          {
            'id': '5a533baec7b4d489ed715b85',
            'name': 'DB2_DB_NAME',
            'type': 'DB2'
          }],
          members: [
            {
              'createdAt': 1515571475,
              'updatedAt': 1515578378,
              'user': {
                'id': '5a535c4a9d226c1a4c946605',
                'name': 'omji1'
              },
              'role': {
                'id': '5a55c819c7b4d407523007bc',
                'name': 'ROLE_MEMBER'
              }
            }
          ],
          'lastUpdatedTime': 'Jan 1st 2018 22:30:40'
        },
        {
          id: '5a55c85d9d226c08140a90d6',
          createdAt: 1515571293,
          updatedAt: 1515578378,
          workspaceName: 'Workspace 2',
          owner: {
            'id': '5a535cbb9d226c1a4c946607',
            'name': 'alok'
          },
          masterMetadataVersion: 22,
          databases: [{
            'id': '5a533baec7b4d489ed715b85',
            'name': 'SQL_DB_NAME',
            'type': 'SQL'
          },
          {
            'id': '5a533baec7b4d489ed715b85',
            'name': 'DB2_DB_NAME',
            'type': 'DB2'
          }],
          members: [
            {
              'createdAt': 1515571475,
              'updatedAt': 1515578378,
              'user': {
                'id': '5a535c4a9d226c1a4c946605',
                'name': 'omji1'
              },
              'role': {
                'id': '5a55c819c7b4d407523007bc',
                'name': 'ROLE_MEMBER'
              }
            }
          ],
          lastUpdatedTime: 'Feb 1st 2018 22:30:40'
        },
        {
          id: '5a55c85d9d226c08140a90d6',
          createdAt: 1515571293,
          updatedAt: 1515578378,
          workspaceName: 'Workspace 3',
          owner: {
            'id': '5a535cbb9d226c1a4c946607',
            'name': 'alok'
          },
          masterMetadataVersion: 22,
          databases: [{
            'id': '5a533baec7b4d489ed715b85',
            'name': 'SQL_DB_NAME',
            'type': 'SQL'
          },
          {
            'id': '5a533baec7b4d489ed715b85',
            'name': 'DB2_DB_NAME',
            'type': 'DB2'
          }],
          members: [
            {
              'createdAt': 1515571475,
              'updatedAt': 1515578378,
              'user': {
                'id': '5a535c4a9d226c1a4c946605',
                'name': 'omji1'
              },
              'role': {
                'id': '5a55c819c7b4d407523007bc',
                'name': 'ROLE_MEMBER'
              }
            }
          ],
          lastUpdatedTime: 'Jan 1st 2018 22:30:40'
        },
        {
          id: '5a55c85d9d226c08140a90d6',
          createdAt: 1515571293,
          updatedAt: 1515578378,
          workspaceName: 'Workspace 4',
          owner: {
            'id': '5a535cbb9d226c1a4c946607',
            'name': 'alok'
          },
          masterMetadataVersion: 22,
          databases: [{
            'id': '5a533baec7b4d489ed715b85',
            'name': 'SQL_DB_NAME',
            'type': 'SQL'
          },
          {
            'id': '5a533baec7b4d489ed715b85',
            'name': 'DB2_DB_NAME',
            'type': 'DB2'
          }],
          members: [
            {
              'createdAt': 1515571475,
              'updatedAt': 1515578378,
              'user': {
                'id': '5a535c4a9d226c1a4c946605',
                'name': 'omji1'
              },
              'role': {
                'id': '5a55c819c7b4d407523007bc',
                'name': 'ROLE_MEMBER'
              }
            }
          ],
          lastUpdatedTime: 'Jan 1st 2018 22:30:40'
        },
        {
          'id': '5a55dcb89d226c4607e16446',
          'createdAt': 1515576504,
          'updatedAt': 1515578378,
          'workspaceName': 'WS_2',
          'masterMetadataVersion': 22,
          'databases': [
            {
              'id': '5a533baec7b4d489ed715b85',
              'name': 'SQL_DB_NAME',
              'type': 'SQL'
            }
          ],
          'members': [],
          'lastUpdatedTime': 'Jan 1st 2018 22:30:40'
        },

      ],
      'success': true,
      'httpStatus': 200
    }
  };
  const simpleObservable = new Observable<any>((observer) => {
    observer.next(workspaceListInfo);
    observer.complete();
  });
  let disposeMe;
  const getWorkspaceListInfo = function (): Observable<any> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [WorkspaceListService],
      declarations: [WorkspaceListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.workspacelist-container'));
    workspaceListHTMLTag = de.nativeElement;
    workspaceListService = TestBed.get(WorkspaceListService);
  });

  it('Should display the observable data  for workspaceList component', () => {
    spyOn(workspaceListService, 'getList').and.returnValue(getWorkspaceListInfo());
    fixture.detectChanges();
    const rowArray: NodeListOf<Element> = workspaceListHTMLTag.querySelectorAll('.wsList');
    const workspaceName = rowArray[0];
    const databaseList = rowArray[1];
    const lastUpdatedTime = rowArray[2];
    const masterMetadataVersion = rowArray[3];
    // console.log(version,'--',workspaceName.textContent,'--',databaseList.textContent.substring(15),'--',
    // lastUpdatedTime.textContent.substring(19),'--',masterMetadataVersion.textContent.substring(18));
    const dbList = component.workspaceListInfo[0].databases;
    const dbNameCSV = dbList.join( (dbList.length > 1 ? ', ' : '' ));
    expect(workspaceName.textContent.trim()).toBe(component.workspaceListInfo[0].workspaceName);
    expect(databaseList.textContent.substring(15)).toBe(dbNameCSV);
    expect(masterMetadataVersion.textContent.substring(18)).toContain(component.workspaceListInfo[0].masterMetadataVersion.toString());
    expect(lastUpdatedTime.textContent.substring(18)).toBe(component.workspaceListInfo[0].lastUpdatedTime);

  });
  it('Should  work the workspaceList component', () => {
    expect(component).toBeTruthy();
  });
  it('Should work the getWorkspaceListInfo function', () => {
    expect(component.getWorkspaceListInfo).toBeTruthy();
  });
});
