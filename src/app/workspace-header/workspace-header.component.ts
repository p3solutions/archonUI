import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, Inject, OnDestroy, Input } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspaceObject, ServiceActionsObject, ConfiguredDB } from '../workspace-objects';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { WorkspaceHeaderService } from './workspace-header.service';
import { archonConfig } from '../config';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../user-profile/user-profile.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { MetalyzerComponent } from '../metalyzer/metalyzer.component';
import { FormControl } from '@angular/forms';
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
  enableCreate = false;
  enableCreateRoles = ['ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_MANAGE_DB', 'ROLE_MANAGE_ARCHON'];
  selectedWorkspaceName: string;
  currentWorkspace: WorkspaceObject;
  fn: any;
  dynamicLoaderService: DynamicLoaderService;
  @ViewChild('createNewWorkspace', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  fetchTimeout = 3000;
  userSelectedWorkspace: string;
  @Output() noWorkspace = new EventEmitter<boolean>();
  newWorkspace: boolean;
  selected;

  constructor(
    private userWorkspaceService: UserWorkspaceService,
    private userinfoService: UserinfoService,
    private workspaceService: WorkspaceServicesService,
    public workspaceHeaderService: WorkspaceHeaderService,
    private router: Router,
    private userProfileService: UserProfileService,
    private route : ActivatedRoute,
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
    const check = this.userinfoService.getRoleList();
    for (const i of check) {
     if (this.enableCreateRoles.includes(i)) {
       this.enableCreate = true;
       break;
     }
    }
  }
  ngOnDestroy() {
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
  }
  bindDropdownClick() {
    $('#selectedWorkspace').off('click').on('click', function () {
      $('#selectedWorkspace a.dropdown-item').removeClass('selected');
      $(this).addClass('selected');
    });
  }

  getUserWorkspaceList() {
    const bindCallback = this.bindDropdownClick;
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
      this.selected = new FormControl(this.userWorkspaceArray[0].workspaceName);
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
    this.serviceActionsList.push({ serviceName: 'ERT', iconName: 'ert.png',
     serviceActionType: 'ALL', serviceId: 'dssa432cdxcwr43r5r' , desc: ''});
    const _temp = this.workspaceService.updateServiceActionsList(this.serviceActionsList);
    this.workspaceService.updateServiceActions(_temp);
    const route = this.route.firstChild.routeConfig.path;
    if (route === 'manage-master-metadata/:id') {
    const id = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.router.navigate(['workspace/workspace-dashboard']);
    setTimeout(() => {
      this.router.navigate(['workspace/workspace-dashboard/manage-master-metadata/' + id]);
    }, 50);
    } else if (route === 'manage-members/:id') {
      const id = this.workspaceHeaderService.getSelectedWorkspaceId();
      this.router.navigate(['workspace/workspace-dashboard']);
      setTimeout(() => {
        this.router.navigate(['workspace/workspace-dashboard/manage-members/' + id]);
      }, 50);
    } else if (route === 'workspace-info/:id') {
      const id = this.workspaceHeaderService.getSelectedWorkspaceId();
      this.router.navigate(['workspace/workspace-dashboard']);
      setTimeout(() => {
        this.router.navigate(['workspace/workspace-dashboard/workspace-info/' + id]);
      }, 50);
    }
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
