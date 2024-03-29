import { Component, OnInit, OnDestroy, Inject, ViewContainerRef, ViewChild } from '@angular/core';
import { WorkspaceObject } from '../workspace-objects';
import { WorkspaceListService } from './workspace-list.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { CommonUtilityService } from '../common-utility.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';


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
    tempWorkspaceActions: any;
    searchText;
    enableCreate = false;
    enableCreateRoles = ['ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_MANAGE_DB', 'ROLE_MANAGE_ARCHON'];

    @ViewChild('createNewWorkspace', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
    WSListInfo: WorkspaceObject;
    WSdeleteId: string;
    success: boolean;
    error: boolean;
    successmsg: any;
    errormsg: any;
    wsName = '';
    wsDesc = '';
    WSeditId: any;
    deleteId: string;
    userinfoId: any;
    WSprofileName: string;
    intervalId: any;
    constructor(
        @Inject(DynamicLoaderService) dynamicLoaderService,
        @Inject(ViewContainerRef) viewContainerRef,
        private workspaceListService: WorkspaceListService,
        private workspaceHeaderService: WorkspaceHeaderService,
        private router: Router,
        private commonUtilityService: CommonUtilityService, private userinfoService: UserinfoService,
        private spinner: NgxSpinnerService

    ) {
        this.userinfoId = this.userinfoService.getUserId();
        this.dynamicLoaderService = dynamicLoaderService;
        this.viewContainerRef = viewContainerRef;
    }
    ngOnDestroy() {
        if (this.viewContainerRef) {
            this.viewContainerRef.remove(0);
        }

        clearInterval(this.intervalId);
    }
    ngOnInit() {
        const userId = sessionStorage.getItem('userId');
        this.accessToken = localStorage.getItem(userId);
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

        this.intervalId = setInterval(() => {
            this.reloadWSlist();
        }, 30000);
    }

    getWorkspaceListInfo(id: string) {
        this.workspaceListInfo = [];
        this.spinner.show();
        this.getWorkspace(id);
    }

    getWorkspace(id) {
        this.workspaceListService.getList(id).subscribe(result => {
            try {
                this.workspaceListInfo = result;
                this.isProgress = false;
                this.setRejectedWorkspaceListInfo(this.workspaceListInfo);
                // this.workspaceActions = this.workspaceListInfo;
                this.workspaceActions = this.workspaceListInfo.filter(a => a.owner.id === this.userinfoId); // My WS
                const otherUserDbList = this.workspaceListInfo.filter(a => a.owner.id !== this.userinfoId); // My Other user WS
                Array.prototype.push.apply(this.workspaceActions, otherUserDbList); // Reorder
                this.tempWorkspaceActions = this.workspaceActions.map(function (el) {
                    const o = Object.assign({}, el);
                    o.ownerId = el.owner.id;
                    o.ownerName = el.owner.name;
                    return o;
                });
                this.spinner.hide();
            } catch {
                this.spinner.hide();
            }
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
        this.getWorkspace(this.token_data.user.id);
        // this.getWorkspaceListInfo(this.token_data.user.id);
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

    WSdelete(deleteId: string, workspaceName: string) {
        this.WSdeleteId = deleteId;
        this.WSprofileName = workspaceName;
    }

    deleteWS() {
        this.workspaceListService.deleteWS(this.WSdeleteId).subscribe((result) => {
            document.getElementById('deletemsgss').click();
            this.successmsg = result;
            this.success = true;
            this.deleteId = this.WSdeleteId;
            this.workspaceHeaderService.selected = undefined;
            this.getWorkspaceListInfo(this.token_data.user.id);
            setTimeout(() => {
                this.getWorkspaceListInfo(this.token_data.user.id);
            }, 15000);
        },
            (error) => {
                document.getElementById('deletemsger').click();
                this.error = true;
                this.errormsg = error.error.message;
            }
        );
    }

    closeErrorMsg() {
        this.success = false;
        this.error = false;
    }

    createWorkspace() {
        this.router.navigate(['create-workspace'], { queryParams: { r: 'workspace' } });
    }

    editWS(workspace) {
        this.WSListInfo = workspace;
        this.wsName = workspace.workspaceName;
        this.wsDesc = workspace.description;
        this.WSeditId = workspace.id;
    }
    updateWS() {
        const params = {
            id: this.WSeditId,
            workspaceName: this.wsName,
            description: this.wsDesc
        };
        this.workspaceListService.updateWS(this.WSeditId, params).subscribe((result: any) => {
            document.getElementById('editmsgwss').click();
            if (result.success) {
                this.successmsg = 'Successfully Updated';
            }
            this.success = true;
            this.getWorkspaceListInfo(this.token_data.user.id);
        },
            (error) => {
                document.getElementById('editmsgwse').click();
                this.error = true;
                this.errormsg = error.error.message;
            }
        );
    }

    searchWorkspace() {
        this.commonUtilityService.filter = this.searchText.trim().toLowerCase();
        this.workspaceActions = this.commonUtilityService._filterData(this.tempWorkspaceActions);
    }
    refreshCharRecord(form: NgForm) {
        form.form.reset();
      }

}


