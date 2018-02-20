import { Component, OnInit } from '@angular/core';
import { WorkspaceObject } from '../workspace-objects';
import { WorkspaceListService } from './workspace-list.service';
import { JwtHelper } from 'angular2-jwt';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {
    accessToken: string;
    jwtHelper: JwtHelper = new JwtHelper();
    token_data: any;
    workspaceListInfo: WorkspaceObject[];
    rejectedWorkspaceListInfo: WorkspaceObject[] = [];
    isProgress: boolean;
    constructor(
        private workspaceListService: WorkspaceListService,
        private router: Router
    ) {
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
            console.log(this.workspaceListInfo);
            this.isProgress = false;
            this.setRejectedWorkspaceListInfo(this.workspaceListInfo);
        });
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
}


