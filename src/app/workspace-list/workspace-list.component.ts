import { Component, OnInit, OnDestroy, Inject, ViewContainerRef, ViewChild } from '@angular/core';
import { WorkspaceObject } from '../workspace-objects';
import { WorkspaceListService } from './workspace-list.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { CommonUtilityService } from '../common-utility.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';


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
    @ViewChild('createNewWorkspace', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
    WSListInfo: WorkspaceObject;

    constructor(
        @Inject(DynamicLoaderService) dynamicLoaderService,
        @Inject(ViewContainerRef) viewContainerRef,
        private workspaceListService: WorkspaceListService,
        private workspaceHeaderService: WorkspaceHeaderService,
        private router: Router,
        private commonUtilityService: CommonUtilityService

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
    }

    getWorkspaceListInfo(id: string) {
        this.workspaceListService.getList(id).subscribe(result => {
            this.workspaceListInfo = result;
            this.isProgress = false;
            this.setRejectedWorkspaceListInfo(this.workspaceListInfo);
            this.workspaceActions = this.commonUtilityService.groupOutArray(this.workspaceListInfo, 3);
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
}


