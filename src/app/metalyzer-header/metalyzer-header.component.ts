import { Component, OnInit, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { UserinfoService } from '../userinfo.service';
import { MatPaginator, MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { MetalyzerDataSource } from './metalyzerdatasource';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionService } from '../permission-utility-functions/permission.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-metalyzer-header',
  templateUrl: './metalyzer-header.component.html',
  styleUrls: ['./metalyzer-header.component.css']
})
export class MetalyzerHeaderComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['modifiedBy', 'createdAt', 'modificationMode', 'modificationDescription'];
  categoryvalues=[{values:'New Join'},{values:'Existing Join'},{values:'Delete'},{values:'New Relationid Existing Join'},{values:'DataAnalyzer New Join'}];
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
  schemaResultsTableCount = 0;
  disable = true;
  @ViewChild(MatPaginator) matpaginator: MatPaginator;
  permissionToUser = '';
  jobname;
  indexStart;
  indexLast;
  totalScreen:number;
  metalyzerValues;
  categoryarr = [];
  metalyzerhistoryarr = [];
  username; category; fromdate; todate;
  todaydate; maxDate;
  errmsg=false;
  startIndex=1;
  lastIndex:number=100;
  exceedstartIndex;
  exceedlastIndex;
  newRecords;
  next=true;
  previous=true;
  refreshcontainer=true;

  constructor(
    private datepipe: DatePipe,
    private router: Router,
    private tablelistService: TableListService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService,
    private userInfoService: UserinfoService,
    private spinner: NgxSpinnerService,
    private permissionService: PermissionService
  ) {
  }

  ngOnInit() {   
    this.previous=true;
    this.next=false;
    this.maxDate = new Date();
    this.GetModificationCategory();
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
    this.loadPage();
    this.permissionToUser = this.permissionService.getMetalyzerPermission();

    this.metalyzerhistoryarr ;
  }


  GetModificationCategory() {
    this.metalyzerHeaderService.getModificationCategory()
      .subscribe(result => {
        for (var i = 0; i < result.length; i++) {
          this.categoryarr.push({ data: result[i] });
        }
      });
  }
    
  getCommonSearch() {
    this.validateSearch(this.workspaceID, this.startIndex, this.lastIndex);
  }

  validateSearch(workspaceID, startIndex, lastIndex) {
    this.spinner.show();
    this.indexStart = startIndex;
    this.indexLast=lastIndex;    
    var latest_start = this.datepipe.transform(this.fromdate, 'MM/dd/yyyy');
    var latest_end = this.datepipe.transform(this.todate, 'MM/dd/yyyy');
    const param = {
      'workspaceId': workspaceID,
      'userId': this.username,
      'metalyzerModificationCategory': this.category,
      'fromDate': latest_start,
      'toDate': latest_end
    };
    this.metalyzerHeaderService.getAudit(param, startIndex, lastIndex)
      .subscribe
      (result => {
        var metalyzerhis = result.model;
        this.metalyzerhistoryarr=[];
        if(metalyzerhis.length==0){
         this.errmsg=true;    
         this.spinner.hide();       
        }else{
          this.errmsg=false;
          for (var i = 0; i < metalyzerhis.length; i++) {
            var metalyzerValues = metalyzerhis[i].modificationDescription;
            var modifiedBy = metalyzerhis[i].modifiedUser;
            var Category = metalyzerhis[i].metalyzerModificationCategory;
            var Datetime = metalyzerhis[i].createdAt;        
            this.metalyzerhistoryarr.push({ data: metalyzerValues, user: modifiedBy, date: Datetime ,category: Category });
            this.spinner.hide();
          }
        }
        
      },
        err => {
          this.spinner.hide();
           console.log(err) });
  }

  ngAfterViewInit() {
  }

  loadPage() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.userid = this.userInfoService.getUserId();
    this.getAuditEvents(this.workspaceID, this.userid, this.startIndex, this.lastIndex);    
    if(this.lastIndex > this.totalScreen){
      this.next=true;
    }
    if(this.startIndex!=1){
      this.previous=false;
    }
  }

getAuditEvents(workspaceID, userid, startIndex, lastIndex) {
    this.spinner.show();
    try {
      this.indexStart = startIndex;
      this.indexLast=lastIndex;     
      const param = {
        'workspaceId': workspaceID,
        'userId': userid
      };
      this.metalyzerHeaderService.getAudit(param, startIndex, lastIndex).subscribe(result => {
        var metalyzerhis = result.model;
        this.totalScreen = result.totalCount;
        this.metalyzerhistoryarr=[];
        if(metalyzerhis.length==0){
        this.spinner.hide();
        this.errmsg=true;        
        }else{
          this.errmsg=false;
          for (var i = 0; i < metalyzerhis.length; i++) {
            var metalyzerValues = metalyzerhis[i].modificationDescription;
            var modifiedBy = metalyzerhis[i].modifiedUser;
            var Category = metalyzerhis[i].metalyzerModificationCategory;
            var Datetime = metalyzerhis[i].createdAt;
            this.metalyzerhistoryarr.push({ data: metalyzerValues, user: modifiedBy, date: Datetime, category: Category });
          }
          this.spinner.hide();
        }
       
      });
    } catch {
      this.spinner.hide();
    }
  }
  
  sortFunc (a, b) {
    return b.date - a.date
  }

  CloseMetalyzerHistory(){
    this.username="";
    this.category="";
    this.fromdate="";
    this.todate="";
  }

  ShowPrevious(){
    this.startIndex=1;
    this.lastIndex=this.newRecords;
    if(this.startIndex==1){
      this.previous=true;
    }
    this.getAuditEvents(this.workspaceID, this.userid, this.startIndex, this.lastIndex);
  }

  ShowMore(){        
    this.startIndex=this.startIndex+100;
    this.lastIndex=this.lastIndex+100;
    if(this.lastIndex >= 500){
      this.refreshcontainer=false;
      this.previous=false;
      this.next=false;
      this.exceedlastIndex=this.lastIndex+100;;
      this.newRecords=this.exceedlastIndex-500;     
      this.metalyzerhistoryarr.splice(1,this.newRecords);
      this.refreshcontainer=true;
      this.getAuditEvents(this.workspaceID, this.userid, this.startIndex, this.lastIndex);
    }
    else{
      this.getAuditEvents(this.workspaceID, this.userid, this.startIndex, this.lastIndex);
    }
    
  
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
        this.message = result.data.message;
        this.jobname = result.data.jobName;
        document.getElementById('successPopUp').click();
        // this.downloadFile(result, result.type);
      });
  }
  exportjson() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportjson(this.workspaceID, this.databaseID, this.json)
      .subscribe(result => {
        this.message = result.data.message;
        this.jobname = result.data.jobName;
        document.getElementById('successPopUp').click();
        // this.downloadFilejson(result, result.type);
      });
  }

  exportOverallpdf() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportOverallpdf(this.workspaceID)
      .subscribe(result => {
        this.message = result.data.message;
        this.jobname = result.data.jobName;
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
        this.message = result.data.message;
        this.jobname = result.data.jobName;
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
