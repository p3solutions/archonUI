import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-metalyzer-header',
  templateUrl: './metalyzer-header.component.html',
  styleUrls: ['./metalyzer-header.component.css']
})
export class MetalyzerHeaderComponent implements OnInit {

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
    });
    this.tablelistService.Dropdownlist.subscribe(data => {
      this.dropdown = data;
    });
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
        this.message = result.data
        document.getElementById('successPopUp').click();
        // this.downloadFile(result, result.type);
      });
  }
  exportjson() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportjson(this.workspaceID, this.databaseID, this.json)
      .subscribe(result => {
        this.downloadFilejson(result, result.type);
      });
  }

  getAudit() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.userid = this.userInfoService.getUserId();
    const param = {
      'workspaceId': this.workspaceID,
      'userId': this.userid
    };
    this.metalyzerHeaderService.getAudit(param).subscribe(result => {
      this.auditArray = result;
    });
  }

  exportOverallpdf() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportOverallpdf(this.workspaceID)
      .subscribe(result => {
        this.downloadFilepdf(result, result.type);
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
        this.downloadFilesecpdf(result, result.type);
      });
  }

  closeErrorMsg() {
    this.updateNotif = false;
  }
  gotoDashboard() {
    this.router.navigate(['/workspace/workspace-dashboard']);
  }
}
