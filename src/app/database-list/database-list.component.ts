import { Component, OnInit, ViewContainerRef, Inject, ViewChild, OnDestroy } from '@angular/core';
import { ConfiguredDB } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';
import { Router } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonUtilityService } from '../common-utility.service';
import { Info } from '../info';
import { archonConfig } from '../config';


@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css']
})
export class DatabaseListComponent implements OnInit, OnDestroy {
  isProgress: boolean;
  configDBListInfo: any;
  info: Info;
  dynamicLoaderService: DynamicLoaderService;
  private dbListActions: any;
  // routeUrl = managementPanelRoute;
  @ViewChild('createNewDatabaseWizard', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  constructor(
    private configDBListService: DatabaseListService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private router: Router,
    private commonUtilityService: CommonUtilityService
    ) {
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.getConfigDBList();
    this.isProgress = true;
  }
  getConfigDBList() {
    const navbarComponent = new NavbarComponent();
    this.info = navbarComponent.getInfo();
    if (archonConfig.dataBaseListRoles.includes(this.info.roles.roleName)) {
      this.info.show = true;
    }
    this.configDBListService.getListOfConfigDatabases().subscribe(result => {
      this.configDBListInfo = result;
      this.isProgress = false;
      this.dbListActions = this.commonUtilityService.groupOutArray(this.configDBListInfo, 3);
    });
  }
  gotoManagementPanel() {
    this.router.navigateByUrl(archonConfig.Urls.managementPanelRoute);
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
