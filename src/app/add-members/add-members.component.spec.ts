import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersComponent } from './add-members.component';
import { AddMembersService } from './add-members.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

xdescribe('AddMembersComponent', () => {
  let component: AddMembersComponent;
  let fixture: ComponentFixture<AddMembersComponent>;
  let testBedService: any;
  const userList = [
    {'id': '5ac5cda32e6c9905ef23b54b', 'createdAt': 1522912675, 'updatedAt': 1522912675, 'name': 'User', 'emailAddress': 'user@test.com',
    'globalRoles': [{'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907, 'updatedAt': 1535533386, 'roleName': 'ROLE_MEMBER',
    'softDeleted': false}], 'softDeleted': false},
    {'id': '5ac5d7af2e6c990861830974', 'createdAt': 1522915246, 'updatedAt': 1522915246, 'name': 'admin', 'emailAddress': 'admin@test.com',
    'globalRoles': [{'id': '5ac5c6bda54d7503a6b80915', 'createdAt': 1522910907, 'updatedAt': 1535533386, 'roleName': 'ROLE_ADMIN',
    'softDeleted': false}], 'softDeleted': false},
    {'id': '5ac763622e6c9951ab2df429', 'createdAt': 1523016546, 'updatedAt': 1523016546, 'name': 'chandruashwin',
    'emailAddress': 'chandru@test.com', 'globalRoles': [{'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907,
    'updatedAt': 1535533386, 'roleName': 'ROLE_MEMBER', 'softDeleted': false}], 'softDeleted': false},
    {'id': '5ace05ac2e6c992281405d6d', 'createdAt': 1523451308, 'updatedAt': 1523451308, 'name': 'Jitendra',
    'emailAddress': 'jitu@test.com', 'globalRoles': [{'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907,
    'updatedAt': 1535533386, 'roleName': 'ROLE_MEMBER', 'softDeleted': false}], 'softDeleted': false},
    {'id': '5acedd732e6c992281405d7c', 'createdAt': 1523506547, 'updatedAt': 1523506547, 'name': 'TestUser',
    'emailAddress': 'testuser@test.com', 'globalRoles': [{'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907,
    'updatedAt': 1535533386, 'roleName': 'ROLE_MEMBER', 'softDeleted': false}], 'softDeleted': false},
    {'id': '5acf37182e6c992281405d93', 'createdAt': 1523529496, 'updatedAt': 1523529496, 'name': 'Manoj Kuma r',
     'emailAddress': 'manoj@test.com', 'globalRoles': [{'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907,
    'updatedAt': 1535533386, 'roleName': 'ROLE_MEMBER', 'softDeleted': false}], 'softDeleted': false},
  ];
  const getAllUsers = function (): Observable<any> {
    const pvtObservable = getSimpleObservable(userList);
    disposeMe.set('getAllDBServer', pvtObservable.subscribe());
    return pvtObservable;
  };
  const disposeMe = new Map();
  const getSimpleObservable = function(data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ AddMembersComponent ],
      providers: [
        AddMembersService, HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembersComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.get(AddMembersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getUserList', () => {
    expect(component.userList.length === 0).toBeTruthy();
    spyOn(testBedService, 'getAllUsers').and.returnValue(getAllUsers());
    component.getUserList();
    fixture.detectChanges();
    expect(component.userList.length > 0).toBeTruthy();
    disposeMe.get('getAllDBServer').unsubscribe();
  });
});
