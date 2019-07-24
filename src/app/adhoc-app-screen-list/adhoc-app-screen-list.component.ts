
import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import {
  ApplicationInfo, AdhocHeaderInfo, Adhoc, ChildScreenInfo,
  ParentScreenInfo, SessionAdhoc, SearchResult, SearchCriteria, Tab, ResultFields
} from '../adhoc-landing-page/adhoc';
import { getUserId } from '../adhoc-landing-page/adhoc-utility-fn';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort } from '@angular/material';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { AdhocSavedObjectService } from '../adhoc-header/adhoc-saved-object.service';
import { ScreenDataSource } from './screen-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { TableSelectionService } from '../adhoc-table-selection/table-selection.service';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { PermissionService } from '../permission-utility-functions/permission.service';
@Component({
  selector: 'app-create-screen-dialog',
  templateUrl: 'create-screen-dialog.html',
})
export class CreateScreenDialogComponent {

  constructor(
    public createScreenDialogRef: MatDialogRef<CreateScreenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public screenInfo: Adhoc) { }

  onNoClick(): void {
    this.createScreenDialogRef.close();
  }

}

@Component({
  selector: 'app-create-app-dialog',
  templateUrl: 'create-app-dialog.html',
})
export class CreateAppDialogComponent {

  constructor(
    public createAppDialogRef: MatDialogRef<CreateAppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appInfo: ApplicationInfo) { }

  onNoClick(): void {
    this.createAppDialogRef.close();
  }

}


@Component({
  selector: 'app-adhoc-app-screen-list',
  templateUrl: './adhoc-app-screen-list.component.html',
  styleUrls: ['./adhoc-app-screen-list.component.css']
})
export class AdhocAppScreenListComponent implements OnInit {
  dataSource: ScreenDataSource;
  screenInfo = new Adhoc();
  displayedColumns: string[] = ['position', 'link', 'screenName', 'parentScreenInfo.screenName',
    'screenDesc', 'updatedBy', 'updatedDate', 'action'];
  screenInfoList: Adhoc[] = [];
  applicationInfoList: ApplicationInfo[] = [];
  selectedAppObject = new ApplicationInfo();
  appInfo = new ApplicationInfo();
  workspaceName = '';
  mmrVersion = '';
  workspaceId = '';
  startIndex = 1;
  totalApps = 0;
  startIndexOfScreen = 0;
  isApplicationLeft = false;
  totalScreen = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  childScreenInfo: ChildScreenInfo[] = [];
  successMessage = '';
  deleteScreenId = '';
  screenInfoObject = new Adhoc();
  menuActionData = new Adhoc();
  IAVersions: string[] = [];
  oldMetadata = false;
  permissionToUser = '';
  constructor(public dialog: MatDialog, private workspaceHeaderService: WorkspaceHeaderService,
    private adhocScreenService: AdhocScreenService, private spinner: NgxSpinnerService,
    private router: Router, private adhocService: AdhocService, private cookieService: CookieService,
    private adhocSavedObjectService: AdhocSavedObjectService, private tableSelection: TableSelectionService,
    private permissionService: PermissionService) { }


  ngOnInit() {
    this.getHeaderInfo();
    this.getApplication();
    this.paginator.pageIndex = 0;
    this.deleteSearchResult();
    this.getIAVersions();
    this.permissionToUser = this.permissionService.getAdhocPermission();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  getApplication() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    let tempResponse = new AdhocHeaderInfo();
    this.adhocService.updatedAdhocHeaderInfo.subscribe(response => {
      tempResponse = response;
    });
    this.adhocService.getApplication(this.workspaceId, this.startIndex).subscribe(result => {
      this.applicationInfoList = result.list;
      this.isApplicationLeft = result.paginationRequired;
      if (this.applicationInfoList.length !== 0) {
        if (tempResponse.appId !== '') {
          this.selectedApp(tempResponse.appId);
        } else {
          this.selectedApp(this.applicationInfoList[0].id);
        }
        this.checkForMetadataInApplication();
      }
    });
  }

  getHeaderInfo() {
    this.workspaceName = this.workspaceHeaderService.getSelectedWorkspaceName();
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.adhocService.getMMRVersionList(this.workspaceId).subscribe((result) => {
      if (result.length === 0) {
        document.getElementById('meta-popup-btn').click();
      } else {
        this.mmrVersion = result[0].versionNo;
        this.checkForMetadataInApplication();
      }
    });
  }

  downloadScreen(screenId, screenName) {
    const userId = getUserId();
    this.adhocService.downloadScreen(screenId, userId).subscribe(data => {
      if (data === undefined) {
        document.getElementById('failed-popup-btn').click();
        this.successMessage = 'Download Failed. Please check status monitoring page for details.';
      } else {
        document.getElementById('success-popup-btn').click();
        this.successMessage = 'Download Started';
        this.downloadFile(data, screenName);
      }
    });
  }

  downloadFile(content, screenName) {
    const fileName = screenName + '.zip';
    const type = 'zip';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  getScreen(startIndexOfScreen) {
    this.spinner.show();
    try {
      this.dataSource = new ScreenDataSource(this.adhocService, this.spinner);
      this.addPosition();
      this.dataSource.connect().subscribe(result => {
        this.screenInfoList = result;
        this.spinner.hide();
      });
      this.dataSource.getScreen(this.paginator.pageIndex + 1, this.workspaceId, this.selectedAppObject.id,
        this.paginator.pageSize === undefined ? 5 : this.paginator.pageSize,
        this.input === undefined ? '' : this.input.nativeElement.value);
      this.dataSource.totalScreenSubject.subscribe(res => {
        this.totalScreen = res;
      });
    } catch {
      this.spinner.hide();
    }
  }

  deleteScreenPopUp(screenId) {
    this.deleteScreenId = screenId;
    document.getElementById('delete-popup-btn').click();
  }

  deleteScreen() {
    const userId = getUserId();
    this.spinner.show();
    try {
      this.adhocService.deleteScreen(this.deleteScreenId, userId).subscribe(result => {
        const index = this.screenInfoList.findIndex(a => a.id === this.deleteScreenId);
        if (index !== -1) {
          this.screenInfoList.splice(index, 1);
        }
        this.getScreen(0);
        this.spinner.hide();
      }, (err: HttpErrorResponse) => {
        if (err.error) {
          this.spinner.hide();
          document.getElementById('failed-popup-btn').click();
          this.successMessage = err.error.message;
        }
      });
    } catch {
      this.spinner.hide();
    }
  }


  deleteApplicationPopUp() {
    document.getElementById('app-delete-popup-btn').click();
  }

  deleteApplicationConfirm() {
    const userId = getUserId();
    this.spinner.show();
    try {
      this.adhocService.deleteApplication(this.selectedAppObject.id, userId).subscribe(result => {
        this.adhocService.updateAdhocHeaderInfo(new AdhocHeaderInfo());
        this.getApplication();
        this.spinner.hide();
      }, (err: HttpErrorResponse) => {
        if (err.error) {
          this.spinner.hide();
          document.getElementById('failed-popup-btn').click();
          this.successMessage = err.error.message;
        }
      });
    } catch {
      this.spinner.hide();
    }
  }


  loadLessonsPage() {
    this.dataSource.getScreen(this.paginator.pageIndex + 1, this.workspaceId, this.selectedAppObject.id,
      this.paginator.pageSize === undefined ? 5 : this.paginator.pageSize,
      this.input === undefined ? '' : this.input.nativeElement.value);
    this.dataSource.totalScreenSubject.subscribe(res => {
      this.totalScreen = res;
    });
  }


  addPosition() {
    this.screenInfoList.forEach((value, index) => {
      value.position = index + 1;
      if (value.parentScreenInfo === null) {
        value.parentScreenInfo = new ParentScreenInfo();
      }
      if (value.childScreenInfo === null) {
        value.childScreenInfo = [];
      }
      if (value.sessionAdhocModel === null) {
        value.sessionAdhocModel = new SessionAdhoc();
      }
    });
  }

  selectedApp(appId: string) {
    this.paginator.pageIndex = 0;
    if (this.applicationInfoList.filter(a => a.id === appId)[0] !== undefined) {
      this.selectedAppObject = JSON.parse(JSON.stringify(this.applicationInfoList.filter(a => a.id === appId)[0]));
    } else {
      this.selectedAppObject = this.applicationInfoList[0];
    }
    this.getScreen(0);
    this.checkForMetadataInApplication();
  }
  openScreenDialog(): void {
    const dialogScreenRef = this.dialog.open(CreateScreenDialogComponent, {
      width: '550px',
      data: this.screenInfo,
      panelClass: 'create-app-dialog'
    });

    dialogScreenRef.afterClosed().subscribe(result => {
      this.createScreen(result);
    });
  }

  openAppDialog(): void {
    this.appInfo = new ApplicationInfo();
    this.getIAVersions();
    const dialogAppRef = this.dialog.open(CreateAppDialogComponent, {
      width: '550px',
      data: this.appInfo,
      panelClass: 'create-app-dialog'
    });
    dialogAppRef.afterClosed().subscribe(result => {
      this.createApplication(result);
    });
    dialogAppRef.keydownEvents().subscribe(res => {
      const id = (res.target as Element).id;
      if (id === 'app-name-id') {
        setTimeout(() => {
          this.appInfo.iaDatabaseName = this.appInfo.appName + '-sql-db';
        }, 200);
      }
    });
  }

  openAppDialogForUpdate(): void {
    this.selectedAppObject.headerText = 'Update';
    this.appInfo = this.selectedAppObject;
    this.getIAVersions();
    const dialogAppRef = this.dialog.open(CreateAppDialogComponent, {
      width: '550px',
      data: this.appInfo,
      panelClass: 'create-app-dialog'
    });
    dialogAppRef.afterClosed().subscribe(result => {
      this.updateApplication(result);
    });
    dialogAppRef.keydownEvents().subscribe(res => {
      const id = (res.target as Element).id;
      if (id === 'app-name-id') {
        setTimeout(() => {
          this.appInfo.iaDatabaseName = this.appInfo.appName + '-sql-db';
        }, 200);
      }
    });
  }

  createApplication(result) {
    if (result !== undefined) {
      const param: any = {
        'appName': result.appName,
        'appDesc': result.appDesc,
        'iaDatabaseName': result.iaDatabaseName,
        'workspaceId': this.workspaceId,
        'metadataVersion': this.mmrVersion,
        'userId': getUserId(),
        'iaVersion': result.iaVersion
      };
      this.adhocService.createApplication(param).subscribe((response) => {
        if (response.httpStatus === 200) {
          document.getElementById('success-popup-btn').click();
          this.successMessage = 'Application Added Successfully.';
          this.applicationInfoList = this.applicationInfoList.concat(response.data);
          if (this.applicationInfoList.length === 1) {
            this.selectedApp(this.applicationInfoList[0].id);
          }
        } else {
          document.getElementById('failed-popup-btn').click();
          this.successMessage = 'Application not Added Successfully.';
        }
      }, (err: HttpErrorResponse) => {
        if (err.error) {
          document.getElementById('failed-popup-btn').click();
          this.successMessage = err.error.message;
        }
      });
    }
  }

  updateApplication(result) {
    if (result !== undefined) {
      const param: any = {
        'id': this.selectedAppObject.id,
        'appName': result.appName,
        'appDesc': result.appDesc,
        'iaDatabaseName': result.iaDatabaseName,
        'workspaceId': this.workspaceId,
        'metadataVersion': this.selectedAppObject.metadataVersion,
        'userId': getUserId(),
        'iaVersion': result.iaVersion
      };
      this.adhocService.updateApplication(param).subscribe((response) => {
        this.adhocService.updateAdhocHeaderInfo(new AdhocHeaderInfo());
        this.getApplication();
        if (response.httpStatus === 200) {
          document.getElementById('success-popup-btn').click();
          this.successMessage = 'Application updated Successfully.';
        } else {
          document.getElementById('failed-popup-btn').click();
          this.successMessage = 'Application not updated Successfully.';
        }
      }, (err: HttpErrorResponse) => {
        if (err.error) {
          document.getElementById('failed-popup-btn').click();
          this.successMessage = err.error.message;
        }
      });
    }
  }

  createScreen(result) {
    if (result !== undefined) {
      const adhoc = new Adhoc();
      adhoc.appId = this.selectedAppObject.id;
      adhoc.workspaceId = this.workspaceId;
      adhoc.screenDesc = result.screenDesc;
      adhoc.screenName = result.screenName;
      adhoc.metadataVersion = this.selectedAppObject.metadataVersion;
      adhoc.parentScreenInfo = result.parentScreenInfo;
      if (result.parentScreenInfo.screenId === '') {
        adhoc['parentScreenInfo'] = null;
      }
      if (result.childScreenInfo.length === 0) {
        adhoc['childScreenInfo'] = null;
      }
      adhoc.sessionAdhoc = null;
      adhoc.schemaName = null;
      adhoc.userId = getUserId();
      delete adhoc['sessionAdhocModel'];
      delete adhoc['applicationInfo'];
      delete adhoc['position'];
      delete adhoc['id'];
      delete adhoc['screenId'];
      this.adhocService.createScreen(adhoc).subscribe((response) => {
        if (response.httpStatus === 200) {
          document.getElementById('success-popup-btn').click();
          this.successMessage = 'Screen Added Successfully.';
          this.getScreen(0);
        } else {
          document.getElementById('failed-popup-btn').click();
          this.successMessage = 'Screen not Added Successfully.';
        }
      }, (err: HttpErrorResponse) => {
        if (err.error) {
          document.getElementById('failed-popup-btn').click();
          this.successMessage = err.error.message;
        }
      });
      this.screenInfo = new Adhoc();
    }
  }

  getSearchScreen() {
    this.dataSource.getSearchScreen(this.paginator.pageIndex + 1,
      this.input.nativeElement.value, this.selectedAppObject.id
    );
    this.totalScreen = (this.paginator.pageIndex + 1) * 50;
    if (this.dataSource.paginationRequired) {
      this.totalScreen = this.totalScreen + 50;
    } else {
      if (this.paginator.pageIndex === 0) {
        this.totalScreen = this.screenInfoList.length;
      } else {
        this.totalScreen = (this.paginator.pageIndex) * 50 + this.screenInfoList.length;
      }
    }
  }

  addScreen() {
    this.screenInfo = new Adhoc();
    this.openScreenDialog();
  }

  addNestedLink(screenId) {
    this.screenInfo = new Adhoc();
    this.screenInfo.parentScreenInfo.screenName = this.screenInfoList.filter(a => a.id === screenId)[0].screenName;
    this.screenInfo.parentScreenInfo.screenId = screenId;
    this.openScreenDialog();
  }

  sortData(sort) {
    this.dataSource.sortfn(sort);
  }

  gotoScreen(screenId: string, element) {
    if (element.parentScreenInfo.screenName !== '') {
      this.tableSelection.booleanNested = true;
    } else {
      this.tableSelection.booleanNested = false;
    }
    const adhocHeaderInfo = new AdhocHeaderInfo();
    adhocHeaderInfo.workspaceName = this.workspaceName;
    adhocHeaderInfo.metadataVersion = this.mmrVersion;
    adhocHeaderInfo.screenName = this.screenInfoList.filter(a => a.id === screenId)[0].screenName;
    adhocHeaderInfo.appName = this.selectedAppObject.appName;
    adhocHeaderInfo.appMetadataVersion = this.selectedAppObject.metadataVersion;
    adhocHeaderInfo.workspaceId = this.workspaceId;
    adhocHeaderInfo.appId = this.selectedAppObject.id;
    this.adhocService.updateAdhocHeaderInfo(adhocHeaderInfo);
    let screenInfoObject = new Adhoc();
    screenInfoObject = this.screenInfoList.filter(a => a.id === screenId)[0];
    if (screenInfoObject.parentScreenInfo.screenId !== '') {
      this.adhocService.getScreenInfo(screenInfoObject.parentScreenInfo.screenId).subscribe(result => {
        if (result.AdhocScreen.sessionAdhocModel === null) {
          this.successMessage = 'Please edit Linked screen.';
          document.getElementById('success-popup-btn').click();
        } else {
          if (screenInfoObject.sessionAdhocModel.primaryTable !== result.AdhocScreen.sessionAdhocModel.primaryTable) {
          }
          screenInfoObject.sessionAdhocModel.selectedTableListString = JSON.stringify(result.AdhocScreen.sessionAdhocModel.selectedTables);
          this.adhocSavedObjectService.setScreenInfoObject(screenInfoObject);
          this.router.navigate(['/workspace/adhoc/screen/table']);
        }
      });
    } else {
      this.adhocSavedObjectService.setScreenInfoObject(screenInfoObject);
      this.router.navigate(['/workspace/adhoc/screen/table']);
    }
  }

  gotoMetadata(value) {
    if (value === 'metadata') {
      this.router.navigate(['/workspace/workspace-dashboard/manage-master-metadata/', this.workspaceId]);
    } else {
      this.router.navigate(['/workspace/workspace-dashboard']);
    }
  }

  getNextBatch() {
    if (this.isApplicationLeft) {
      this.startIndex = this.startIndex + 1;
      this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
      this.adhocService.getApplication(this.workspaceId, this.startIndex).subscribe(result => {
        this.applicationInfoList = this.applicationInfoList.concat(result.list);
        this.isApplicationLeft = result.paginationRequired;
      });
    }
  }

  showChildInfo(screenId) {
    this.childScreenInfo = this.screenInfoList.filter(a => a.id === screenId)[0].childScreenInfo;
  }

  gotoDashboard() {
    this.router.navigate(['/workspace/workspace-dashboard']);
  }

  datasourceHasValue() {
    let isScreenPresent;
    if (this.screenInfoList.length > 0) {
      isScreenPresent = false;
    } else {
      isScreenPresent = true;
    }
    return isScreenPresent;
  }

  deleteSearchResult() {
    this.adhocScreenService.updateSearchCriteria([]);
    this.adhocScreenService.updateSearchResult(new SearchResult());
    this.adhocScreenService.updateSearchCriterion(new SearchCriteria());
    this.adhocScreenService.updateInlinePanelTabChange(new Tab());
    this.adhocScreenService.updateSidePanelTabChange(new Tab());
    this.adhocScreenService.updateResultField(new ResultFields());
    this.adhocScreenService.updatePanelChanged(0);
    this.screenInfoObject.sessionAdhocModel.searchCriteria = [];
    this.screenInfoObject.sessionAdhocModel.searchResult.mainPanel = [];
    this.screenInfoObject.sessionAdhocModel.searchResult.sidePanel = null;
    this.screenInfoObject.sessionAdhocModel.searchResult.inLinePanel = null;
    this.screenInfoObject.sessionAdhocModel.graphDetails.selectedPrimaryTable = '';
    this.adhocSavedObjectService.screenInfoObject = this.screenInfoObject;
    this.adhocSavedObjectService.primarytableIdWhenNoRelation = '';
  }

  showActions(adhoc: Adhoc) {
    this.menuActionData = adhoc;
  }

  checkForMetadataInApplication() {
    if (this.selectedAppObject.metadataVersion !== '') {
      if (this.selectedAppObject.metadataVersion.trim() !== this.mmrVersion.trim()) {
        this.oldMetadata = true;
      } else {
        this.oldMetadata = false;
      }
    }
  }


  getIAVersions() {
    this.adhocService.getIAVersions().subscribe(response => {
      if (response.length > 0) {
        this.IAVersions = response;
        this.appInfo.iaVersionList = this.IAVersions;
      }
    });
  }
}
