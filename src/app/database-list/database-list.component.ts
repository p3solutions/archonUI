import { Component, OnInit, ViewContainerRef, Inject, ViewChild, OnDestroy} from '@angular/core';
import { ConfiguredDB } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';
import { Router } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css']
})
export class DatabaseListComponent implements OnInit {
  isProgress: boolean;
  configDBListInfo: any;
  dynamicLoaderService: DynamicLoaderService;
  @ViewChild('createNewDatabaseWizard', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  constructor(
    private configDBListService: DatabaseListService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private router: Router) 
    {
      this.dynamicLoaderService = dynamicLoaderService;
      this.viewContainerRef = viewContainerRef;
    }

  ngOnInit() {
    this.getConfigDBList();
    this.isProgress = true;
  }
  getConfigDBList() {
    this.configDBListService.getListOfConfigDatabases().subscribe(result => {
      this.configDBListInfo = result;
      console.log(this.configDBListInfo);
      this.isProgress = false;
    });
  }
  gotoManagementPanel() {
    this.router.navigate(['workspace/management-panel']);
  }

  ngOnDestroy() {
    console.log('removing viewContainerRef');
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
  }
  openCreateAddDBmodal() {
    console.log('alok alokaloak', this.viewContainerRef);
    if (this.viewContainerRef.get(0)) {
      // open existing dynamic component
      document.getElementById('openCreateAddDBmodal').click();
    } else {
      // inject dynamic component
      this.dynamicLoaderService.setRootViewContainerRef(this.viewContainerRef);
      this.dynamicLoaderService.addDynamicComponent1();
    }
  }
}
