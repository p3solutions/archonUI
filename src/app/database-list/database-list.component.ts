import { Component, OnInit, ViewContainerRef, Inject, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ConfiguredDB } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';
import { Router, ActivatedRoute} from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonUtilityService } from '../common-utility.service';
import { Info } from '../info';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserinfoService } from '../userinfo.service';

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
  toggleBoolean = false;
  pendingList = [];
  dataSource = new MatTableDataSource(this.pendingList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['DB Profile Name', 'Workspace Name', 'Workspace Owner', 'Comments', 'Approve', 'Reject'];
  @ViewChild('createNewDatabaseWizard', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  workspaceId: any;
  heading: string;
  element: any;
  reason: string;
  elementId: any;
  checkAdmin = ['ROLE_MANAGE_DB']; // enable pending approval
  allowToggle = false;
  @ViewChild('myDiv') myDiv: ElementRef;
  success: boolean;
  error: boolean;
  DBdeleteId: string;
  errormsg: any;
  successmsg: any;

  constructor(
    private configDBListService: DatabaseListService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private router: Router,private route: ActivatedRoute,
    private workspaceHeaderService: WorkspaceHeaderService,
    private commonUtilityService: CommonUtilityService, private userinfoService: UserinfoService
    ) {
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.getConfigDBList();
    this.isProgress = true;
    this.getDBInfoByID();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllPending();
    const check = this.userinfoService.getRoleList();
    for (const i of check) {
     if (this.checkAdmin.includes(i)) {
       this.allowToggle = true;
       break;
     }
    }
    if (this.route.snapshot.paramMap.get('notification')) {
    const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
    }
  }

  getAllPending(): any {
    this.configDBListService.getPending().subscribe(result => {
      this.pendingList = result;
      this.dataSource.data = this.pendingList;
    });
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

  toggle() {
    if (this.allowToggle) {
      this.toggleBoolean = !this.toggleBoolean;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(element, method) {
    if (method === 'Approve') {
     this.heading = 'Approval Confirmation';
    } else {
      this.heading = 'Rejection Confirmation';
    }
    this.element = element;
    this.elementId = element.id;
  }

  submit(value) {
    const resultArray = [];
    const obj = {
      workspaceApprovalId: this.elementId,
      status: value,
      reason: this.reason
    };
    resultArray.push(obj);
    const body = {
      workspaceAproval : resultArray
    }
    this.configDBListService.postDecision(body).subscribe(result => {
    if (result) {
    this.getAllPending();
    }
    });
  }

  DBdelete(deleteId: string) {
    this.DBdeleteId = deleteId;
  }

  deleteDB() {
    this.configDBListService.deleteDB(this.DBdeleteId).subscribe((result) => {
          document.getElementById('deletemsg').click();
          this.successmsg = result;
            this.success = true;
           // this.getConfigDBList();
             setTimeout(() => {
               this.getConfigDBList();
             }, 15000);
  },
  (error) => {
    document.getElementById('deletemsg').click();
    this.error = true;
    this.errormsg = error.error.errorMessage;
  }
  );
}

closeErrorMsg() {
    this.success = false;
    this.error = false;
  }

}
