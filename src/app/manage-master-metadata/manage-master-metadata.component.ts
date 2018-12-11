import { Component, OnInit } from '@angular/core';
import { ManageMasterMetadataService } from './manage-master-metadata.service';
import { ManageMasterMetadata } from '../master-metadata-data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-manage-master-metadata',
  templateUrl: './manage-master-metadata.component.html',
  styleUrls: ['./manage-master-metadata.component.css']
})
export class ManageMasterMetadataComponent implements OnInit {

  manage_Master_Metadata: ManageMasterMetadata[];

  isProgress: boolean;

  slNo: number;

  constructor(
    private manage_Master_MetadataService: ManageMasterMetadataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isProgress = false;
    this.getManage_Master_MetaData();
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

}
