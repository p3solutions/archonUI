import { Component, OnInit } from '@angular/core';
import { ManageMasterMetadataService } from '../manage-master-metadata.service';
import { Manage_Master_Metadata } from '../master-metadata-data';
@Component({
  selector: 'app-manage-master-metadata',
  templateUrl: './manage-master-metadata.component.html',
  styleUrls: ['./manage-master-metadata.component.css']
})
export class ManageMasterMetadataComponent implements OnInit {

  manage_Master_Metadata: Manage_Master_Metadata[];

  isAvailable = false;

  slNo: number;

  constructor(private manage_Master_MetadataService: ManageMasterMetadataService) {

  }

  ngOnInit(): void {
    this.getManage_Master_MetaData();
  }
  getManage_Master_MetaData() {
    this.manage_Master_MetadataService.getManageMasterMetaData()
      .subscribe(data => {
        this.manage_Master_Metadata = data;
        this.isAvailable = true;
      });
  }

  deleteManageMasterRecord(obj: Manage_Master_Metadata) {
    this.manage_Master_Metadata = this.manage_Master_Metadata.filter(h => h !== obj);
    this.manage_Master_MetadataService.removeManageMasterData(obj).subscribe();

  }

}
