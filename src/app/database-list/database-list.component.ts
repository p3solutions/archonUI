import { Component, OnInit, ViewContainerRef, Inject, ViewChild, OnDestroy } from '@angular/core';
import { ConfiguredDB } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';
import { Router } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Info } from '../info';

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
  @ViewChild('createNewDatabaseWizard', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  constructor(
    private configDBListService: DatabaseListService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private router: Router) {
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
    if (this.info.roles.roleName === 'ROLE_DB_ADMIN') {
      this.info.show = true;
    } else if (this.info.roles.roleName === 'ROLE_SUPER_ADMIN') {
      this.info.show = true;
    } else if (this.info.roles.roleName === 'ROLE_DB_MEMBER') {
      this.info.show = true;
    }
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
