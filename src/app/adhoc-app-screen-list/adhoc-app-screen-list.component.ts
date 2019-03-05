
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ScreenInfo, ApplicationInfo } from '../adhoc-landing-page/adhoc';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort } from '@angular/material';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ManageMasterMetadataService } from '../manage-master-metadata/manage-master-metadata.service';

@Component({
  selector: 'app-create-screen-dialog',
  templateUrl: 'create-screen-dialog.html',
})
export class CreateScreenDialogComponent {

  constructor(
    public createScreenDialogRef: MatDialogRef<CreateScreenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public screenInfo: ScreenInfo) { }

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
  screenInfo = new ScreenInfo();
  displayedColumns: string[] = ['Position', 'screenName', 'screenDesc', 'Edit', 'Delete'];
  ScreenInfoList: ScreenInfo[] = [
    { Position: 1, screenDesc: 'A', screenName: 'AA' },
    { Position: 2, screenDesc: 'B', screenName: 'AB' },
    { Position: 3, screenDesc: 'C', screenName: 'AC' },
    { Position: 4, screenDesc: 'D', screenName: 'AD' },
    { Position: 5, screenDesc: 'E', screenName: 'AE' },
    { Position: 6, screenDesc: 'F', screenName: 'AF' }
  ];
  applicationInfoList: ApplicationInfo[] = [];
  appInfo = new ApplicationInfo;
  workspaceName = '';
  mmrVersion = '';
  workspaceId = '';
  dataSource = new MatTableDataSource<ScreenInfo>(this.ScreenInfoList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,  private workspaceHeaderService: WorkspaceHeaderService,
    private manageMetaService: ManageMasterMetadataService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applicationInfoList.push({ appName: 'App 1', appDesc: 'First App' });
    this.applicationInfoList.push({ appName: 'App 2', appDesc: 'Second App' });
    this.applicationInfoList.push({ appName: 'App 3', appDesc: 'Third App' });
    this.getHeaderInfo();
  }

  getHeaderInfo() {
    this.workspaceName = this.workspaceHeaderService.getSelectedWorkspaceName();
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.manageMetaService.getMMRVersionList(this.workspaceId).subscribe((result) => {
      this.mmrVersion = result[0].versionNo;
    });
  }
  openScreenDialog(): void {
    const dialogScreenRef = this.dialog.open(CreateScreenDialogComponent, {
      width: '550px',
      data: this.screenInfo,
      panelClass: 'create-app-dialog'
    });

    dialogScreenRef.afterClosed().subscribe(result => {
      console.log('The Screen dialog was closed');
      console.log(result);
    });
  }

  openAppDialog(): void {
    const dialogAppRef = this.dialog.open(CreateAppDialogComponent, {
      width: '550px',
      data: this.appInfo,
      panelClass: 'create-app-dialog'
    });

    dialogAppRef.afterClosed().subscribe(result => {
      console.log('The App dialog was closed');
      console.log(result);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
