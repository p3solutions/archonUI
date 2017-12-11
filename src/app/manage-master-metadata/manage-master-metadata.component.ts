import { Component, OnInit } from '@angular/core';
import { ManageMasterMetadataService } from '../manage-master-metadata.service';
import { Manage_Master_Metadata } from '../master-metadata-data';
@Component({
  selector: 'app-manage-master-metadata',
  templateUrl: './manage-master-metadata.component.html',
  styleUrls: ['./manage-master-metadata.component.css']
})
export class ManageMasterMetadataComponent implements OnInit {  

  manage_Master_Metadata : Manage_Master_Metadata[];
  
    isAvailable: boolean = false;
  
    constructor(private manage_Master_MetadataService: ManageMasterMetadataService) {
      this.getMemberRequestData();
    }
  
    ngOnInit() {
  
    }
    getMemberRequestData() {
  
      this.manage_Master_MetadataService.getMasterDetails()
        .subscribe(data => {
          this.manage_Master_Metadata = data;
          this.isAvailable = true;
        });
        console.log(this.manage_Master_Metadata+"*");
    }

}
