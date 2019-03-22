
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ApplicationInfo, AdhocHeaderInfo, Adhoc, ChildScreenInfo, ParentScreenInfo, SessionAdhoc } from '../adhoc-landing-page/adhoc';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort } from '@angular/material';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { AdhocSavedObjectService } from '../adhoc-header/adhoc-saved-object.service';
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
  screenInfo = new Adhoc();
  displayedColumns: string[] = ['position', 'screenName', 'parentScreenInfo.screenName',
    'screenDesc', 'edit', 'nestedLink', 'delete', 'download'];
  screenInfoList: Adhoc[] = [{
    'mmrVersion': '113',
    'position': 1,
    'appId': '12ws',
    'workspaceId': 'asddsa',
    'schemaName': 'Shreesh',
    'screenName': 'Shreesh',
    'screenDesc': 'Shreesh',
    'id': 'sss',
    'screenId': 'ss',
    'applicationInfo': new ApplicationInfo(),
    'parentScreenInfo': new ParentScreenInfo(),
    'childScreenInfo':  [],
    'sessionAdhoc': new SessionAdhoc(),
    'sessionAdhocModel':  new SessionAdhoc()
  }
  ];
  applicationInfoList: ApplicationInfo[] = [];
  selectedAppObject = new ApplicationInfo();
  appInfo = new ApplicationInfo();
  workspaceName = '';
  mmrVersion = '';
  workspaceId = '';
  startIndex = 0;
  startIndexOfScreen = 0;
  dataSource = new MatTableDataSource<Adhoc>(this.screenInfoList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  childScreenInfo: ChildScreenInfo[] = [];
  constructor(public dialog: MatDialog, private workspaceHeaderService: WorkspaceHeaderService,
    private router: Router, private adhocService: AdhocService, private adhocSavedObjectService: AdhocSavedObjectService, ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getHeaderInfo();
    this.getApplication();
    this.dataSource.data = this.screenInfoList;
  }

  getApplication() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.adhocService.getApplication(this.workspaceId, this.startIndex).subscribe(result => {
      this.applicationInfoList = result;
      if (this.applicationInfoList.length !== 0) {
        this.selectedApp(this.applicationInfoList[0].id);
      }
     // this.getScreen(0);
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

  getScreen(startIndexOfScreen) {
    this.adhocService.getScreen(startIndexOfScreen, this.workspaceId, this.selectedAppObject.id).subscribe((result) => {
      this.screenInfoList = result;
      this.addPosition();
      this.dataSource.data = this.screenInfoList;
    });
  }

  deleteScreen(screenId) {
    this.adhocService.deleteScreen(screenId).subscribe(result => {
      console.log(result);
      const index = this.screenInfoList.findIndex(a => a.id === screenId);
      if (index !== -1) {
        this.screenInfoList.splice(index, 1);
      }
      this.dataSource.data = this.screenInfoList;
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
    this.selectedAppObject = JSON.parse(JSON.stringify(this.applicationInfoList.filter(a => a.id === appId)[0]));
    // this.getScreen(screen)
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
    adhoc.mmrVersion = this.mmrVersion;
    adhoc.parentScreenInfo = result.parentScreenInfo;
    if (result.parentScreenInfo.screenId === '') {
      delete adhoc['parentScreenInfo'];
    }
    if (result.childScreenInfo.length === 0) {
      delete adhoc['childScreenInfo'];
    }
    adhoc.sessionAdhoc = null;
    adhoc.schemaName = null;
    delete adhoc['sessionAdhocModel'];
    delete adhoc['applicationInfo'];
    delete adhoc['position'];
    delete adhoc['id'];
    delete adhoc['screenId'];
    this.adhocService.createScreen(adhoc).subscribe((response) => {
      response.position = this.screenInfoList.length + 1;
      if (response.parentScreenInfo === null) {
        response.parentScreenInfo = new ParentScreenInfo();
      }
      if (response.childScreenInfo === null) {
        response.childScreenInfo = [];
      }
      if (response.sessionAdhocModel === null) {
        response.sessionAdhocModel = new SessionAdhoc();
      }
      this.screenInfoList.push(response);
      this.dataSource.data = this.screenInfoList;
    });
    this.screenInfo = new Adhoc();
  }


  applyFilter(filterValue: string) {
    this.getSearchScreen(1, filterValue);
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSearchScreen(startIndexOfScreen, searchScreenText) {
    this.adhocService.getSearchScreen(startIndexOfScreen, searchScreenText, this.selectedAppObject.id).subscribe((result) => {
      this.screenInfoList = result;
      this.addPosition();
      this.dataSource.data = this.screenInfoList;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
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
    adhocHeaderInfo.workspaceId = this.workspaceId;
    this.adhocService.updateAdhocHeaderInfo(adhocHeaderInfo);
    let screenInfoObject = new Adhoc();
    screenInfoObject = this.screenInfoList.filter(a => a.id === screenId)[0];
    this.adhocSavedObjectService.setScreenInfoObject(screenInfoObject);
    this.router.navigate(['/workspace/adhoc/screen/table']);
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
}
