import { Component, OnInit, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { UserinfoService } from '../userinfo.service';
import { MatPaginator } from '@angular/material';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetalyzerDataSource } from './metalyzerdatasource';

@Component({
  selector: 'app-metalyzer-header',
  templateUrl: './metalyzer-header.component.html',
  styleUrls: ['./metalyzer-header.component.css']
})
export class MetalyzerHeaderComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['modifiedBy', 'createdAt', 'modificationMode', 'modificationDescription'];

  wsName: string;
  phase: string;
  workspaceID: any;
  xml = 'xml';
  json = 'json';
  databaseID: any;
  exportxmlview: any;
  userselectTableslist: any;
  userid: any;
  auditArray = [];
  updateNotif: boolean;
  p = 1;
  dropdown: any;
  message: void;
  startIndex = 1;
  schemaResultsTableCount = 0;
  disable = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MetalyzerDataSource;

  constructor(
    private router: Router,
    private tablelistService: TableListService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService,
    private userInfoService: UserinfoService
  ) {
  }

  ngOnInit() {
    this.metalyzerHeaderService.cast
      .subscribe(data => {
        this.phase = data;
      });
    this.metalyzerHeaderService.getWorkspaceName().subscribe(result => {
      this.wsName = result;
    });
    this.tablelistService.userselectTableslist.subscribe(data => {
      this.userselectTableslist = data;
      if (this.userselectTableslist.tableId === undefined) {
        this.disable = true;
      } else {
        this.disable = false;
      }
    });
    this.tablelistService.Dropdownlist.subscribe(data => {
      this.dropdown = data;
    });
    this.paginator.pageIndex = 0;
    this.getStart();
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  loadPage() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
      this.userid = this.userInfoService.getUserId();
    this.dataSource.getAudit(this.workspaceID, this.userid, this.paginator.pageIndex + 1);
  }

  getStart() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.userid = this.userInfoService.getUserId();
    this.dataSource = new MetalyzerDataSource(this.metalyzerHeaderService);
    this.dataSource.getAudit(this.workspaceID, this.userid,this.paginator.pageIndex + 1);
    }


  downloadFile(content, fileType) {
    const fileName = this.wsName + '-metadata.xml';
    const type = fileType || 'xml';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName || 'output.xml';
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  downloadFilejson(content, fileType) {
    const fileName = this.wsName + '-metadata.json';
    const type = fileType || 'json';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName || 'output.json';
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  downloadFilepdf(content, fileType) {
    const fileName = this.wsName + '-metadata.pdf';
    const type = fileType || 'pdf';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName || 'output.pdf';
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  downloadFilesecpdf(content, fileType) {
    const fileName = this.wsName + '-metadata.pdf';
    const type = fileType || 'pdf';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName || 'output.pdf';
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  exportxml() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportxml(this.workspaceID, this.databaseID, this.xml)
      .subscribe(result => {
        this.message = result.data;
        document.getElementById('successPopUp').click();
        // this.downloadFile(result, result.type);
      });
  }
  exportjson() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportjson(this.workspaceID, this.databaseID, this.json)
      .subscribe(result => {
        this.message = result.data;
        document.getElementById('successPopUp').click();
        // this.downloadFilejson(result, result.type);
      });
  }

  exportOverallpdf() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportOverallpdf(this.workspaceID)
      .subscribe(result => {
        this.message = result.data;
        document.getElementById('successPopUp').click();
        // this.downloadFilepdf(result, result.type);
      });
  }
  exportSelectedpdf() {
    this.updateNotif = false;
    if (this.userselectTableslist.tableId === undefined) {
      this.updateNotif = true;
    }
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportSelectedpdf(this.workspaceID, this.userselectTableslist.tableId)
      .subscribe(result => {
        this.message = result.data;
        document.getElementById('successPopUp').click();
        // this.downloadFilesecpdf(result, result.type);
      });
  }

  closeErrorMsg() {
    this.updateNotif = false;
  }
  gotoDashboard() {
    this.router.navigate(['/workspace/workspace-dashboard']);
  }

  dataanalyze() {
    document.getElementById('dataanalyze').click();
  }
  spvjoin() {
    document.getElementById('spv').click();
  }
  adddirectjoin() {
    document.getElementById('directjoin').click();
  }
  selectedxml() {
    document.getElementById('exxml').click();
  }
  selectedjson() {
    document.getElementById('exjson').click();
  }
}
