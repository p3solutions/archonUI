
import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { ApplicationInfo, AdhocHeaderInfo, Adhoc, ChildScreenInfo, ParentScreenInfo, SessionAdhoc } from '../adhoc-landing-page/adhoc';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort } from '@angular/material';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { AdhocSavedObjectService } from '../adhoc-header/adhoc-saved-object.service';
import { ScreenDataSource } from './screen-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
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
    'screenDesc', 'edit', 'nestedLink', 'delete', 'download'];
  screenInfoList: Adhoc[] = [];
  applicationInfoList: ApplicationInfo[] = [];
  selectedAppObject = new ApplicationInfo();
  appInfo = new ApplicationInfo();
  workspaceName = '';
  mmrVersion = '';
  workspaceId = '';
  startIndex = 0;
  totalApps = 0;
  startIndexOfScreen = 0;
  totalScreen = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  childScreenInfo: ChildScreenInfo[] = [];
  successMessage = '';
  constructor(public dialog: MatDialog, private workspaceHeaderService: WorkspaceHeaderService,
    private router: Router, private adhocService: AdhocService, private adhocSavedObjectService: AdhocSavedObjectService, ) { }


  ngOnInit() {

    this.getHeaderInfo();
    this.getApplication();
    this.paginator.pageIndex = 0;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.getSearchScreen();
        })
      )
      .subscribe();



    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  getApplication() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.adhocService.getApplication(this.workspaceId, this.startIndex).subscribe(result => {
      this.applicationInfoList = result.list;
      this.totalApps = result.totalApp;
      if (this.applicationInfoList.length !== 0) {
        this.selectedApp(this.applicationInfoList[0].id);
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
      }
    });
  }

  downloadScreen(screenId, screenName) {
    this.adhocService.downloadScreen(screenId).subscribe(data => {
      if (data === undefined) {
        document.getElementById('success-popup-btn').click();
        this.successMessage = 'Download Failed';
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
    this.dataSource = new ScreenDataSource(this.adhocService);
    this.addPosition();
    this.dataSource.connect().subscribe(result => {
      this.screenInfoList = result;
      this.totalScreen = this.dataSource.totalScreen;
    });
    this.dataSource.getScreen(this.paginator.pageIndex + 1, this.workspaceId, this.selectedAppObject.id);
  }

  deleteScreen(screenId) {
    this.adhocService.deleteScreen(screenId).subscribe(result => {
      const index = this.screenInfoList.findIndex(a => a.id === screenId);
      if (index !== -1) {
        this.screenInfoList.splice(index, 1);
      }
      this.getScreen(0);
    });
  }

  loadLessonsPage() {
    this.dataSource.getScreen(
      this.paginator.pageIndex + 1,
      this.workspaceId,
      this.selectedAppObject.id);
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
    this.selectedAppObject = JSON.parse(JSON.stringify(this.applicationInfoList.filter(a => a.id === appId)[0]));
    console.log(this.selectedAppObject);
    this.getScreen(0);
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
    const dialogAppRef = this.dialog.open(CreateAppDialogComponent, {
      width: '550px',
      data: this.appInfo,
      panelClass: 'create-app-dialog'
    });
    dialogAppRef.afterClosed().subscribe(result => {
      this.createApplication(result);
    });
  }

  createApplication(result) {
    const param: any = {
      'appName': result.appName,
      'appDesc': result.appDesc,
      'workspaceId': this.workspaceId,
      'metadataVersion': this.mmrVersion
    };
    this.adhocService.createApplication(param).subscribe((response) => {
      this.applicationInfoList = this.applicationInfoList.concat(response);
    });
  }

  createScreen(result) {
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
    delete adhoc['sessionAdhocModel'];
    delete adhoc['applicationInfo'];
    delete adhoc['position'];
    delete adhoc['id'];
    delete adhoc['screenId'];
    this.adhocService.createScreen(adhoc).subscribe((response) => {
      document.getElementById('success-popup-btn').click();
      if (response.httpStatus === 200) {
        this.successMessage = 'Screen Added Successfully';
        this.getScreen(0);
      } else {
        this.successMessage = 'Screen not Added Successfully';
      }
    });
    this.screenInfo = new Adhoc();
  }

  getSearchScreen() {
    this.dataSource.getSearchScreen(this.paginator.pageIndex + 1,
      this.input.nativeElement.value, this.selectedAppObject.id
    );
  }

  addScreen() {
    this.openScreenDialog();
  }

  addNestedLink(screenId) {
    this.screenInfo = new Adhoc();
    this.screenInfo.parentScreenInfo.screenName = this.screenInfoList.filter(a => a.id === screenId)[0].screenName;
    this.screenInfo.parentScreenInfo.screenId = screenId;
    this.openScreenDialog();
  }


  gotoScreen(screenId: string) {
    const adhocHeaderInfo = new AdhocHeaderInfo();
    adhocHeaderInfo.workspaceName = this.workspaceName;
    adhocHeaderInfo.metadataVersion = this.mmrVersion;
    adhocHeaderInfo.screenName = this.screenInfoList.filter(a => a.id === screenId)[0].screenName;
    adhocHeaderInfo.appName = this.selectedAppObject.appName;
    adhocHeaderInfo.appMetadataVersion = this.selectedAppObject.metadataVersion;
    adhocHeaderInfo.workspaceId = this.workspaceId;
    this.adhocService.updateAdhocHeaderInfo(adhocHeaderInfo);
    let screenInfoObject = new Adhoc();
    screenInfoObject = this.screenInfoList.filter(a => a.id === screenId)[0];
    if (screenInfoObject.parentScreenInfo.screenId !== '') {
      this.adhocService.getScreenInfo(screenInfoObject.parentScreenInfo.screenId).subscribe(result => {
        screenInfoObject.sessionAdhocModel.selectedTableListString = JSON.stringify(result.AdhocScreen.sessionAdhocModel.selectedTables);
        this.adhocSavedObjectService.setScreenInfoObject(screenInfoObject);
        this.router.navigate(['/workspace/adhoc/screen/table']);
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
    this.startIndex = this.startIndex + 1;
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.adhocService.getApplication(this.workspaceId, this.startIndex).subscribe(result => {
      this.applicationInfoList = this.applicationInfoList.concat(result);
    });
  }

  showChildInfo(screenId) {
    this.childScreenInfo = this.screenInfoList.filter(a => a.id === screenId)[0].childScreenInfo;
  }

  gotoDashboard() {
    this.router.navigate(['/workspace/workspace-dashboard']);
  }
}
