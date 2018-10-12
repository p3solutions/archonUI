import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatabaseWizardComponent } from './add-database-wizard.component';
import { Observable } from 'rxjs/Observable';
import { UserWorkspaceService } from '../user-workspace.service';

xdescribe ('AddDatabaseWizardComponent', () => {
  let component: AddDatabaseWizardComponent;
  let fixture: ComponentFixture<AddDatabaseWizardComponent>;
  let testBedService: any;
  const allowedDBs = [
      {'id': '5ac5c6c6a54d7503aaaa4851', 'name': 'MYSQL', 'type': 'RDBMS', 'defaultPort': 3306},
      {'id': '5ac5c6c6a54d7503aaaa4850', 'name': 'SQL', 'type': 'RDBMS', 'defaultPort': 1433},
      {'id': '5ac5c6c6a54d7503aaaa4854', 'name': 'ORACLE', 'type': 'RDBMS', 'defaultPort': 1521}
    ];
  const getSimpleObservable = function(data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };

  const disposeMe = new Map();
  const getAllDBServer = function (): Observable<any> {
    const pvtObservable = getSimpleObservable(allowedDBs);
    disposeMe.set('getAllDBServer', pvtObservable.subscribe());
    return pvtObservable;
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDatabaseWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatabaseWizardComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.get(UserWorkspaceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should getAllDBServer', () => {
    expect(component.dbServerList.length === 0).toBeTruthy();
    spyOn(testBedService, 'getAllDBServer').and.returnValue(getAllDBServer());
    component.getAllDBServer();
    fixture.detectChanges();
    expect(component.dbServerList.length > 0).toBeTruthy();
    disposeMe.get('getAllDBServer').unsubscribe();
  });

});
