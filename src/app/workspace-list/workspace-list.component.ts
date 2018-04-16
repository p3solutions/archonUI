import { Component, OnInit, OnDestroy, Inject, ViewContainerRef, ViewChild } from '@angular/core';
import { WorkspaceObject } from '../workspace-objects';
import { WorkspaceListService } from './workspace-list.service';
import { JwtHelper } from 'angular2-jwt';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DynamicLoaderService } from '../dynamic-loader.service';

@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit, OnDestroy {
    accessToken: string;
    jwtHelper: JwtHelper = new JwtHelper();
    token_data: any;
    workspaceListInfo: WorkspaceObject[];
    rejectedWorkspaceListInfo: WorkspaceObject[] = [];
    isProgress: boolean;
    dynamicLoaderService: DynamicLoaderService;
    @ViewChild('createNewWorkspace', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    constructor(
        @Inject(DynamicLoaderService) dynamicLoaderService,
        @Inject(ViewContainerRef) viewContainerRef,
        private workspaceListService: WorkspaceListService,
        private router: Router
    ) {
        this.dynamicLoaderService = dynamicLoaderService;
        this.viewContainerRef = viewContainerRef;
    }
    ngOnDestroy() {
        console.log('removing viewContainerRef');
        if (this.viewContainerRef) {
            this.viewContainerRef.remove(0);
        }
    }
    ngOnInit() {
        this.accessToken = localStorage.getItem('accessToken');
        this.token_data = this.jwtHelper.decodeToken(this.accessToken);
        this.getWorkspaceListInfo(this.token_data.user.id);
        this.isProgress = true;
    }

    getWorkspaceListInfo(id: string) {
        this.workspaceListService.getList(id).subscribe(result => {
            this.workspaceListInfo = result;
            // console.log(this.workspaceListInfo);
            this.isProgress = false;
            this.setRejectedWorkspaceListInfo(this.workspaceListInfo);
        });
    }

    reloadWSlist() {
        this.getWorkspaceListInfo(this.token_data.user.id);        
    }

    gotoManagementPanel() {
        this.router.navigate(['workspace/management-panel']);
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
}


