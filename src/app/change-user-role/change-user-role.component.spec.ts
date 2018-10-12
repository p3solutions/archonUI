import { async, ComponentFixture, TestBed, inject, fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { ChangeUserRoleComponent } from './change-user-role.component';
import { ChangeUserRoleService } from './change-user-role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

describe('ChangeUserRoleComponent', () => {
  let component: ChangeUserRoleComponent;
  let fixture: ComponentFixture<ChangeUserRoleComponent>;
  let testBedService: any;
  const globalRoles = [
    {'id': '5ac5c6bda54d7503a6b80915', 'createdAt': 1522910907, 'updatedAt': 1536312362, 'roleName': 'ROLE_ADMIN', 'softDeleted': false},
    {'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907, 'updatedAt': 1536312362, 'roleName': 'ROLE_MEMBER', 'softDeleted': false},
    {'id': '5ac5c6bda54d7503a6b80917', 'createdAt': 1522910907, 'updatedAt': 1536312362, 'roleName': 'ROLE_NOT_ASSIGNED',
    'softDeleted': false}
  ];
  const getSimpleObservable = function(data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };
  const disposeMe = new Map();
  const getGlobalRoleDetails = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('getGlobalRoleDetails', pvtObservable.subscribe());
    return pvtObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserRoleComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ChangeUserRoleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService = TestBed.get(ChangeUserRoleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ChangeUserRoleService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ChangeUserRoleService], (injectService: ChangeUserRoleService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Should get Global Roles when getGlobalRoleData is called', fakeAsync( () => {
    expect(component.globalRolesRequestData).toBeUndefined();
    spyOn(testBedService, 'getGlobalRoleDetails').and.returnValue(getGlobalRoleDetails(globalRoles));
    component.getGlobalRoleData();
    flushMicrotasks();
    fixture.detectChanges();
    testBedService.getGlobalRoleDetails().subscribe(res => {
      expect(res).toEqual(globalRoles);
    });
    disposeMe.get('getGlobalRoleDetails').unsubscribe();
  }));

});
