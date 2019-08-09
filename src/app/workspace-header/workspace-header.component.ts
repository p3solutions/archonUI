import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, Inject, OnDestroy, Input } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspaceObject, ServiceActionsObject, ConfiguredDB } from '../workspace-objects';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { WorkspaceHeaderService } from './workspace-header.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { getUserId } from '../adhoc-landing-page/adhoc-utility-fn';
import { PermissionService } from '../permission-utility-functions/permission.service';
import { response } from '../table-list/responemmr';
export let firstload = 0;
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
    public workspaceHeaderService: WorkspaceHeaderService,
    private router: Router,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private spinner: NgxSpinnerService,
    private permissionService: PermissionService
  ) {
    this.dynamicLoaderService = dynamicLoaderService;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    // if new workspace is added, to refresh the list
    this.workspaceHeaderService.currentWSValue.subscribe(value => {
      this.newWorkspace = value;
      if (this.newWorkspace === true) {
        this.getUserWorkspaceList();
      }
    });

    // if user selects workspace from profile.
    this.userProfileService.userSelectedWorkspace.subscribe(data => {
      this.userSelectedWorkspace = data;
    });

    if (this.userSelectedWorkspace) {
      this.loadUserSelectedWorkspace(this.userSelectedWorkspace);
    } else {
      this.getUserWorkspaceList();
    }

    // user UI restriction
    const check = this.userinfoService.getRoleList();
    for (const i of check) {
      if (this.enableCreateRoles.includes(i)) {
        this.enableCreate = true;
        break;
      }
    }

    // Update the workspace list because service permission will update in workspace service component.
    this.workspaceHeaderService.updatedWorkspaceList.subscribe(res => {
      this.userWorkspaceArray = res;
    });
  }

  ngOnDestroy() {
    if (this.viewContainerRef) {
      this.viewContainerRef.remove(0);
    }
  }

  getUserWorkspaceList() {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
      this.workspaceHeaderService.updateWorkspaceList(this.userWorkspaceArray);
      try {
        if (this.workspaceHeaderService.selected === undefined) {
          this.workspaceHeaderService.selected = this.userWorkspaceArray[0].workspaceName;
          this.selectWorkspace(this.userWorkspaceArray[0]);
        } else {
          const isWorkspaceExist = this.userWorkspaceArray.filter(a => a.workspaceName === this.workspaceHeaderService.selected)[0];
          if (isWorkspaceExist === undefined) {
            this.workspaceHeaderService.selected = this.userWorkspaceArray[0].workspaceName;
            this.selectWorkspace(this.userWorkspaceArray[0]);
          }
        }
      } catch {
        this.spinner.hide();
      }
    });
  }

  loadUserSelectedWorkspace(selectedWorkspace) {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
    });
    this.selectWorkspace(selectedWorkspace);
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

    const selectedWorkspaceForUser = JSON.parse(JSON.stringify(selectedWorkspace.members.
      filter(a => a.user.id === getUserId())[0]));

    const userServiceActions = JSON.parse(JSON.stringify(selectedWorkspaceForUser.serviceActions));
    // update for the workspace permission.

    this.permissionService.updateSelectedWorkspaceObj(selectedWorkspaceForUser);

    this.workspaceHeaderService.selected = selectedWorkspace.workspaceName;
    this.currentWorkspace = selectedWorkspace;

    this.workspaceHeaderService.setSelectedWorkspace(this.currentWorkspace);
    // Assigning Serviceactions of first member as it is common for all (Not Required.)
    // Commented below line because now workspace permission of service to user is implemented.
    // this.serviceActionsList = JSON.parse(JSON.stringify(selectedWorkspace.members[0].serviceActions));

    const _temp = this.workspaceService.updateServiceActionsList(userServiceActions);
    this.workspaceService.updateServiceActions(_temp);

    // to route to the same page of workspace
    const route = this.route.firstChild.routeConfig.path;
    if (route === 'manage-master-metadata/:id') {
      if (selectedWorkspaceForUser.workspaceRole.name !== 'ROLE_APPROVER' && selectedWorkspaceForUser.workspaceRole.name !== 'ROLE_OWNER') {
        this.router.navigate(['workspace/workspace-dashboard']);
      } else {
        const id = this.workspaceHeaderService.getSelectedWorkspaceId();
        this.router.navigateByUrl('/workspace/workspace-dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['workspace/workspace-dashboard/manage-master-metadata/' + id]));
      }
    } else if (route === 'manage-members/:id') {
      if (selectedWorkspaceForUser.workspaceRole.name !== 'ROLE_APPROVER' && selectedWorkspaceForUser.workspaceRole.name !== 'ROLE_OWNER') {
        this.router.navigate(['workspace/workspace-dashboard']);
      } else {
        const id = this.workspaceHeaderService.getSelectedWorkspaceId();
        this.router.navigateByUrl('/workspace/workspace-dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['workspace/workspace-dashboard/manage-members/' + id]));
      }
    } else if (route === 'workspace-info/:id') {
      const id = this.workspaceHeaderService.getSelectedWorkspaceId();
      this.router.navigateByUrl('/workspace/workspace-dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['workspace/workspace-dashboard/workspace-info/' + id]));
    }
  }

  createWorkspace() {
    this.router.navigate(['create-workspace'], { queryParams: { r: 'home' } });
  }
}
