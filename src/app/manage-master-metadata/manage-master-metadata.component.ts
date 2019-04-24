import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageMasterMetadataService } from './manage-master-metadata.service';
import { ManageMasterMetadata } from '../master-metadata-data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-manage-master-metadata',
  templateUrl: './manage-master-metadata.component.html',
  styleUrls: ['./manage-master-metadata.component.css']
})
export class ManageMasterMetadataComponent implements OnInit {

  manage_Master_Metadata: ManageMasterMetadata[];
  versionNo = '';
  desc = '';
  isProgress: boolean;
  disabledSaveBtn = true;
  slNo: number;
  workspaceId = '';
  isAvailable = true;
  manageMasterMetaList: ManageMasterMetadata[] = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  role: any;
  page =1;
  constructor(
    private manage_Master_MetadataService: ManageMasterMetadataService,
    private router: Router,
    private workspaceHeaderService: WorkspaceHeaderService
  ) { }

  ngOnInit() {
    this.isProgress = false;
    this.dtOptions = {
      stateSave: true,
      paging: true,
      pageLength: 10,
      pagingType: 'full_numbers',
      destroy: true
    };
    this.getMMRVersionList();
    this.role = this.workspaceHeaderService.getSelectedWorkspaceWorkspaceRole();
  }
  getManage_Master_MetaData() {
    this.manage_Master_MetadataService.getManageMasterMetaData()
      .subscribe(data => {
        this.manage_Master_Metadata = data;
        this.isProgress = true;
      });
  }

  deleteManageMasterRecord(obj: ManageMasterMetadata) {
    this.manage_Master_Metadata = this.manage_Master_Metadata.filter(h => h !== obj);
    this.manage_Master_MetadataService.removeManageMasterData(obj).subscribe();
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
  saveMMRVersion() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.manage_Master_MetadataService.saveMMRVersion(this.workspaceId, this.versionNo, btoa(this.desc)).subscribe(result => {
      alert(result.data);
      this.getMMRVersionList();
    });
  }

  getMMRVersionList() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.manage_Master_MetadataService.getMMRVersionList(this.workspaceId).subscribe(result => {
      this.manageMasterMetaList = result;
      this.isAvailable = true;
    });
  }

  enableSaveBtn() {
    if (this.versionNo !== '' && this.desc !== '') {
      this.disabledSaveBtn = false;
    } else {
      this.disabledSaveBtn = true;
    }
  }
  openMMRVersionModel() {
    this.versionNo = '';
    this.desc = '';
  }
}
