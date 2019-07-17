import { Component, OnInit, ViewContainerRef, Inject, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ConfiguredDB } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonUtilityService } from '../common-utility.service';
import { Info } from '../info';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserinfoService } from '../userinfo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css']
})

export class DatabaseListComponent implements OnInit, OnDestroy {
  isProgress: boolean;
  configDBListInfo: any;
  databaseID: any;
  configuredDB = new ConfiguredDB();
  info: Info;
  dynamicLoaderService: DynamicLoaderService;
  dbListActions = [];
  tempDbListActions = [];
  searchText;
  toggleBoolean = false;
  pendingList = [];
  dataSource = new MatTableDataSource(this.pendingList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['DB Profile Name', 'Workspace Name', 'Workspace Owner', 'Comments', 'Approve', 'Reject'];
  @ViewChild('createNewDatabaseWizard', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  workspaceId: any;
  heading: string;
  element: any;
  reason = '';
  elementId: any;
  checkAdmin = ['ROLE_MANAGE_DB']; // enable pending approval
  allowToggle = false;
  @ViewChild('myDiv') myDiv: ElementRef;
  success: boolean;
  error: boolean;
  DBdeleteId: string;
  errormsg: any;
  successmsg: any;
  DBupdateId: any;
  dbpassword: any;
  dbName: any;
  deleteId: string;
  userinfoId: any;
  DBprofileName: string;

  constructor(
    private configDBListService: DatabaseListService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private router: Router, private route: ActivatedRoute,
    private workspaceHeaderService: WorkspaceHeaderService,
    private commonUtilityService: CommonUtilityService, private userinfoService: UserinfoService
  ) {
    this.userinfoId = this.userinfoService.getUserId();
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.getConfigDBList();
    this.isProgress = true;
    this.getDBInfoByID();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllPending();
    const check = this.userinfoService.getRoleList();
    for (const i of check) {
      if (this.checkAdmin.includes(i)) {
        this.allowToggle = true;
        break;
      }
    }
    if (this.route.snapshot.paramMap.get('notification')) {
      const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
      el.click();
    }
  }

  getAllPending(): any {
    this.configDBListService.getPending().subscribe(result => {
      this.pendingList = result;
      this.dataSource.data = this.pendingList;
    });
  }

  getDBInfoByID() {
    this.configDBListService.getDBInfoByID(this.workspaceHeaderService.getDatabaseID()).subscribe(
      (result) => {
        this.configuredDB = result;
      }
    );
  }

  viewDBmodal(database) {
    this.configuredDB = database;
  }

  getConfigDBList() {
    this.configDBListService.getListOfConfigDatabases().subscribe(result => {
      this.configDBListInfo = result;
      this.isProgress = false;
      this.dbListActions = this.configDBListInfo.filter(a => a.owner.id === this.userinfoId); // My DB
      const otherUserDbList = this.configDBListInfo.filter(a => a.owner.id !== this.userinfoId); // My Other user DB
      Array.prototype.push.apply(this.dbListActions, otherUserDbList); // Reorder
      console.log(this.dbListActions);
      this.tempDbListActions = this.dbListActions.map(function (el) {
        const o = Object.assign({}, el);
        o.ownerId = el.owner.id;
        o.ownerName = el.owner.name;
        return o;
      });
    });
  }
  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }

  ngOnDestroy() {
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
  }
  openCreateAddDBmodal() {
    if (this.viewContainerRef.get(0)) {
      // open existing dynamic component
      document.getElementById('openCreateAddDBmodal').click();
    } else {
      // inject dynamic component
      this.dynamicLoaderService.setRootViewContainerRef(this.viewContainerRef);
      this.dynamicLoaderService.addDynamicComponent1();
    }
  }
  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }

  toggle() {
    if (this.allowToggle) {
      this.toggleBoolean = !this.toggleBoolean;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(element, method) {
    if (method === 'Approve') {
      this.heading = 'Approval Confirmation';
    } else {
      this.heading = 'Rejection Confirmation';
    }
    this.element = element;
    this.elementId = element.id;
  }

  submit(value) {
    const resultArray = [];
    const obj = {
      workspaceApprovalId: this.elementId,
      status: value,
      reason: this.reason
    };
    resultArray.push(obj);
    const body = {
      workspaceAproval: resultArray
    }
    this.configDBListService.postDecision(body).subscribe(result => {
      if (result) {
        this.getAllPending();
        this.reason = '';
      }
    });
  }

  DBdelete(deleteId: string, profileName: string) {
    this.DBdeleteId = deleteId;
    this.DBprofileName = profileName;
  }

  deleteDB() {
    this.configDBListService.deleteDB(this.DBdeleteId).subscribe((result) => {
      document.getElementById('deletemsgsuccess').click();
      this.successmsg = result;
      this.success = true;
      this.deleteId = this.DBdeleteId;
      this.getConfigDBList();
      setTimeout(() => {
        this.getConfigDBList();
      }, 15000);
    },
      (err: HttpErrorResponse) => {
        document.getElementById('deletemsgerror').click();
        this.error = true;
        this.errormsg = err.error.message;
      }
    );
  }

  closeErrorMsg() {
    this.success = false;
    this.error = false;
  }
  editDB(database) {
    this.dbpassword = '';
    this.configuredDB = database;
    this.dbName = database.databaseName;
    this.DBupdateId = database.id;
  }
  updateDB() {
    const params = {
      id: this.DBupdateId,
      password: this.dbpassword
    };
    this.configDBListService.updateDB(this.DBupdateId, params).subscribe((result: any) => {
      document.getElementById('editmsgsuccess').click();
      if (result.success) {
        this.successmsg = 'Successfully Updated';
      }
      this.success = true;
      this.getConfigDBList();
    },
      (error) => {
        document.getElementById('editmsgerror').click();
        this.error = true;
        this.errormsg = error.error.message;
      }
    );
  }

  createDatabase() {
    this.router.navigate(['create-database'], { queryParams: { r: 'database' } });
  }
  searchDatabase() {
    this.commonUtilityService.filter = this.searchText.trim().toLowerCase();
    this.dbListActions = this.commonUtilityService._filterData(this.tempDbListActions);
  }
}
