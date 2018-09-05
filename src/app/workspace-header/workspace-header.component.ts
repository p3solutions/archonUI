import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, Inject, OnDestroy } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspaceObject, ServiceActionsObject } from '../workspace-objects';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { WorkspaceHeaderService } from './workspace-header.service';
import { sample } from 'rxjs/operators';
@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.css']
})
export class WorkspaceHeaderComponent implements OnInit, OnDestroy {
  userWorkspaceArray: WorkspaceObject[];
  serviceActionsList: ServiceActionsObject;
  userRole: any;
  selectedWorkspaceName: string;
  currentWorkspace: WorkspaceObject;
  fn: any;
  dynamicLoaderService: DynamicLoaderService;
  @ViewChild('createNewWorkspace', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @Output() serviceActionsListEvent = new EventEmitter<ServiceActionsObject[]>();
  constructor(
    private userWorkspaceService: UserWorkspaceService,
    private userinfoService: UserinfoService,
    private workspaceService: WorkspaceServicesService,
    private workspaceHeaderService: WorkspaceHeaderService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
  ) {
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
   }

  ngOnInit() {
    this.getUserWorkspaceList();
    this.userRole = this.userinfoService.getUserRoles();
  }
  ngOnDestroy() {
    console.log('removing viewContainerRef');
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
  }
  bindDropdownClick() {
    console.log('bind');
    $('#selectedWorkspace a.dropdown-data').off('click').on('click', function () {
      $('#selectedWorkspace a.dropdown-item').removeClass('selected');
      $(this).addClass('selected');
    });
  }
  getUserWorkspaceList() {
    const bindCallback = this.bindDropdownClick;
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
      if (res && res.length > 0) {
        const fn = function () {
          const dropdownItem = (<HTMLAnchorElement>document.querySelector('#selectedWorkspace .dropdown-data'));
          if (dropdownItem) {
            bindCallback();
            dropdownItem.click();
            clearInterval(k);
          }
        };
        const k = setInterval(fn, 500);
      }
    });
  }

  contactAdmin() {
    console.log('contact Admin function pending!');
  }

  openCreateWSModal() {
    if (this.viewContainerRef.get(0)) {
      // open existing dynamic component
      document.getElementById('openCreateWSmodal').click();
    } else {
      // inject dynamic component
      this.dynamicLoaderService.setRootViewContainerRef(this.viewContainerRef);
      this.dynamicLoaderService.addDynamicComponent();
    }
  }

  selectWorkspace(selectedWorkspace: WorkspaceObject) {
    this.selectedWorkspaceName = selectedWorkspace.workspaceName;
    this.currentWorkspace = selectedWorkspace;
    this.workspaceHeaderService.setSelectedWorkspace(this.currentWorkspace);
    // Assigning Serviceactions of first member as it is common for all
    this.serviceActionsList = selectedWorkspace.members[0].serviceActions;
    this.workspaceService.passServiceActions(this.serviceActionsList);
    // this.serviceActionsListEvent.emit(this.serviceActionsList);
  }
  onChange(val) {
    // const ws = JSON.stringify(val);
    switch (val) {
      case '0':
          // do nothing
        break;
      case '1': {
        this.openCreateWSModal();
        break;
      }
      case '2': {
        this.contactAdmin();
        break;
      }
      default:
        // this.selectWorkspace(JSON.parse(ws));
        break;
    }
  }
}
