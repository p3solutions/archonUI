import { Component, OnInit, OnDestroy, Inject, ViewContainerRef, ViewChild } from '@angular/core';
import { WorkspaceObject } from '../workspace-objects';
import { WorkspaceListService } from './workspace-list.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { CommonUtilityService } from '../common-utility.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';


@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit, OnDestroy {
    accessToken: string;
    workspaceID: any;
    jwtHelper: JwtHelperService = new JwtHelperService();
    token_data: any;
    workspaceListInfo: WorkspaceObject[];
    rejectedWorkspaceListInfo: WorkspaceObject[] = [];
    isProgress: boolean;
    dynamicLoaderService: DynamicLoaderService;
    workspaceActions: any;
    searchText;
    enableCreate = false;
    enableCreateRoles = ['ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_MANAGE_DB', 'ROLE_MANAGE_ARCHON'];

    @ViewChild('createNewWorkspace', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
    WSListInfo: WorkspaceObject;
    WSdeleteId: string;
    success: boolean;
    error: boolean;

    constructor(
        @Inject(DynamicLoaderService) dynamicLoaderService,
        @Inject(ViewContainerRef) viewContainerRef,
        private workspaceListService: WorkspaceListService,
        private workspaceHeaderService: WorkspaceHeaderService,
        private router: Router,
        private commonUtilityService: CommonUtilityService, private userinfoService: UserinfoService

    ) {
        this.dynamicLoaderService = dynamicLoaderService;
        this.viewContainerRef = viewContainerRef;
    }
    ngOnDestroy() {
        if (this.viewContainerRef) {
            this.viewContainerRef.remove(0);
        }
    }
    ngOnInit() {
        this.accessToken = localStorage.getItem('accessToken');
        this.token_data = this.jwtHelper.decodeToken(this.accessToken);
        this.getWorkspaceListInfo(this.token_data.user.id);
        this.isProgress = true;
        this.getWSInfoID();
        const check = this.userinfoService.getRoleList();
        for (const i of check) {
         if (this.enableCreateRoles.includes(i)) {
           this.enableCreate = true;
           break;
         }
        }
    }

    getWorkspaceListInfo(id: string) {
        this.workspaceListInfo = [];
            this.workspaceListService.getList(id).subscribe(result => {
            this.workspaceListInfo = result;
            this.isProgress = false;
            this.setRejectedWorkspaceListInfo(this.workspaceListInfo);
            this.workspaceActions = this.workspaceListInfo;
        });
    }

    getWSInfoID() {
            this.workspaceListService.getWSInfoID(this.workspaceHeaderService.getSelectedWorkspaceId()).subscribe(
                (result) => {
                  this.WSListInfo = result;
                }
              );
      }

    reloadWSlist() {
        this.getWorkspaceListInfo(this.token_data.user.id);
    }

    viewWSmodal(workspace) {
        this.success = false;
        this.error = false;
        this.WSListInfo = workspace;
      }

    gotoManagementPanel() {
        this.router.navigate(['management-landing-page/management-panel']);
    }
    setRejectedWorkspaceListInfo(wsListInfo: WorkspaceObject[]) {
        let i;
        for (i in wsListInfo) {
            if (wsListInfo[i].workspaceState === 'REJECTED') {
                this.rejectedWorkspaceListInfo.push(wsListInfo[i]);
            }
        }
    }
    openCreateWSModal() {
        this.success = false;
        this.error = false;
        if (this.viewContainerRef.get(0)) {
            // open existing dynamic component
            document.getElementById('openCreateWSmodal').click();
        } else {
            // inject dynamic component
            this.dynamicLoaderService.setRootViewContainerRef(this.viewContainerRef);
            this.dynamicLoaderService.addDynamicComponent();
        }
    }

    toggleCard(cardId, toShow, _event) {
        this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
    }

    WSdelete(deleteId: string) {
        this.success = false;
        this.error = false;
        this.WSdeleteId = deleteId;
      }

      deleteWS() {
        this.workspaceListService.deleteWS(this.WSdeleteId).subscribe(result => {
            console.log(result);
            if (result) {
                this.success = true;
                setTimeout(() => {
                    this.getWorkspaceListInfo(this.token_data.user.id);
                }, 15000);
            } else {
             this.error = true;
            }
      });
    }

    closeErrorMsg() {
        this.success = false;
        this.error = false;
      }
}


