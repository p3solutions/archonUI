import { Component, OnInit, ViewContainerRef, Inject, ViewChild, OnDestroy } from '@angular/core';
import { ConfiguredDB } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';
import { Router } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonUtilityService } from '../common-utility.service';
import { Info } from '../info';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css']
})
export class DatabaseListComponent implements OnInit, OnDestroy {
  isProgress: boolean;
  configDBListInfo: any;
  databaseID: any;
  configuredDB = new ConfiguredDB();
  info: Info;
  dynamicLoaderService: DynamicLoaderService;
  dbListActions = [];
  searchText;

  @ViewChild('createNewDatabaseWizard', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  constructor(
    private configDBListService: DatabaseListService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private router: Router,
    private workspaceHeaderService: WorkspaceHeaderService,
    private commonUtilityService: CommonUtilityService
    ) {
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.getConfigDBList();
    this.isProgress = true;
    this.getDBInfoByID();
  }

  getDBInfoByID() {
    this.configDBListService.getDBInfoByID(this.workspaceHeaderService.getDatabaseID()).subscribe(
      (result) => {
        this.configuredDB = result;
      }
    );
  }

  viewDBmodal(database) {
    this.configuredDB = database;
  }

  getConfigDBList() {
    const navbarComponent = new NavbarComponent(null);
    this.info = navbarComponent.getInfo();
    if (this.info.roles.roleName === 'ROLE_DB_ADMIN') {
      this.info.show = true;
    } else if (this.info.roles.roleName === 'ROLE_SUPER_ADMIN') {
      this.info.show = true;
    } else if (this.info.roles.roleName === 'ROLE_DB_MEMBER') {
      this.info.show = true;
    }
    this.configDBListService.getListOfConfigDatabases().subscribe(result => {
      this.configDBListInfo = result;
      this.isProgress = false;
      this.dbListActions = this.configDBListInfo;
    });
  }
  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }

  ngOnDestroy() {
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
  }
  openCreateAddDBmodal() {
    if (this.viewContainerRef.get(0)) {
      // open existing dynamic component
      document.getElementById('openCreateAddDBmodal').click();
    } else {
      // inject dynamic component
      this.dynamicLoaderService.setRootViewContainerRef(this.viewContainerRef);
      this.dynamicLoaderService.addDynamicComponent1();
    }
  }
  toggleCard(cardId, toShow, _event) {
   this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }
}
