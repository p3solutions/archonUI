import { Component, OnInit, ViewContainerRef, Inject, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ConfiguredDB, PendingDB } from '../workspace-objects';
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
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PendingDatabaseDataSource } from './pending-database-data-source';

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
  pendingList: PendingDB[] = [];
  dataSource: PendingDatabaseDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['dbProfileName', 'workspaceName', 'workspaceOwnerName', 'reason', 'approve', 'reject'];
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
  @ViewChild('input') input: ElementRef;
  totalCount = 0;
  showPendingApproval = true;
  toShowDatabase = false;
  search = '';
  intervalId: any;
  constructor(
    private configDBListService: DatabaseListService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private router: Router, private route: ActivatedRoute,
    private workspaceHeaderService: WorkspaceHeaderService,
    private commonUtilityService: CommonUtilityService, private userinfoService: UserinfoService,
    private spinner: NgxSpinnerService
  ) {
    this.userinfoId = this.userinfoService.getUserId();
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.getConfigDBList();
    this.isProgress = true;
    this.getDBInfoByID();
    const check = this.userinfoService.getRoleList();
    for (const i of check) {
      if (this.checkAdmin.includes(i)) {
        this.allowToggle = true;
        break;
      }
    }
    if (this.route.snapshot.paramMap.get('notification')) {
      this.toShowDatabase = true;
      this.paginator.pageSize = 10;
      this.getAllPending();
    }

    this.refreshDbList();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.paginator.pageSize = 5;
          this.getAllPending();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page)
      .pipe(
        tap(() => this.getAllPending())
      )
      .subscribe();
  }

  getAllPending(): any {
    this.dataSource = new PendingDatabaseDataSource(this.spinner, this.configDBListService);
    this.dataSource.getPendingWorkspace(this.paginator.pageIndex + 1, this.paginator.pageSize, this.search);
    this.dataSource.totalCountSubject.subscribe(res => {
      this.totalCount = res;
    });
  }

  refreshDbList() {
    this.intervalId = setInterval(() => {
      this.getDbList();
    }, 30000);
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

  showDatabase() {
    this.toShowDatabase = false;
  }

  pendingApproval() {
    this.toShowDatabase = true;
    this.getAllPending();
  }

  getConfigDBList() {
    this.spinner.show();
    try {
      this.getDbList();
    } catch {
      this.spinner.hide();
    }
  }
  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }

  getDbList() {
    this.configDBListService.getListOfConfigDatabases().subscribe(result => {
      this.configDBListInfo = result;
      this.isProgress = false;
      this.dbListActions = this.configDBListInfo.filter(a => a.owner.id === this.userinfoId); // My DB
      const otherUserDbList = this.configDBListInfo.filter(a => a.owner.id !== this.userinfoId); // My Other user DB
      Array.prototype.push.apply(this.dbListActions, otherUserDbList); // Reorder
      this.tempDbListActions = this.dbListActions.map(function (el) {
        const o = Object.assign({}, el);
        o.ownerId = el.owner.id;
        o.ownerName = el.owner.firstName + ' ' + el.owner.lastName;
        return o;
      });
      if (this.searchText) {
        this.searchDatabase();
      }
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
    clearInterval(this.intervalId);
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
    if (this.toggleBoolean) {

    }
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

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

  sortData(sort) {
    this.dataSource.sortfn(sort);
  }
}
