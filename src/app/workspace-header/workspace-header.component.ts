import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, Inject, OnDestroy, Input } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspaceObject, ServiceActionsObject, ConfiguredDB } from '../workspace-objects';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { WorkspaceHeaderService } from './workspace-header.service';
import { archonConfig } from '../config';
import { Router, RouterModule } from '@angular/router';
import { UserProfileService } from '../user-profile/user-profile.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { MetalyzerComponent } from '../metalyzer/metalyzer.component';
@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.css']
})
export class WorkspaceHeaderComponent implements OnInit, OnDestroy {
  @Input() userWorkspaceArray: WorkspaceObject[];
  serviceActionsList: ServiceActionsObject[];
  userId: string;
  userRole: any;
  enableWorkspace = false;
  selectedWorkspaceName: string;
  currentWorkspace: WorkspaceObject;
  fn: any;
  dynamicLoaderService: DynamicLoaderService;
  @ViewChild('createNewWorkspace', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  fetchTimeout = 3000;
  userSelectedWorkspace: string;
  @Output() noWorkspace = new EventEmitter<boolean>();
  newWorkspace: boolean;

  constructor(
    private userWorkspaceService: UserWorkspaceService,
    private userinfoService: UserinfoService,
    private workspaceService: WorkspaceServicesService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private router: Router,
    private userProfileService: UserProfileService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
  ) {
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.workspaceHeaderService.currentWSValue.subscribe(value => {
      this.newWorkspace = value;
      if (this.newWorkspace === true) {
        this.getUserWorkspaceList();
      }
     });
    this.userProfileService.userSelectedWorkspace.subscribe(data => {
      this.userSelectedWorkspace = data;
    }
    );
    if (this.userSelectedWorkspace) {
      this.loadUserSelectedWorkspace(this.userSelectedWorkspace);
    } else {
      this.getUserWorkspaceList();
    }
    this.userRole = this.userinfoService.getUserRoles();
    this.enableWorkspace = archonConfig.workSpaceAllowedAdmins.includes(this.userRole.roleName);
  }
  ngOnDestroy() {
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
  }
  bindDropdownClick() {
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
          } else if ((currentTime + this.fetchTimeout) > (new Date().getTime())) {
            clearInterval(k);
          }
        };
        const currentTime = new Date().getTime();
        const k = setInterval(fn, 500);
      }
    });
  }

  loadUserSelectedWorkspace(selectedWorkspace) {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
    });
    this.selectWorkspace(selectedWorkspace);
  }

  contactAdmin() {
    // TODO: Contact admin function pending
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
    this.serviceActionsList = JSON.parse(JSON.stringify(selectedWorkspace.members[0].serviceActions));
    this.serviceActionsList.push({ serviceName: 'ERT', iconName: 'metalyzer.png',
     serviceActionType: 'ALL', serviceId: 'dssa432cdxcwr43r5r' });
    const _temp = this.workspaceService.updateServiceActionsList(this.serviceActionsList);
    this.workspaceService.updateServiceActions(_temp);
    //  setTimeout(() => {
    //  }, 3000);

    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
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
