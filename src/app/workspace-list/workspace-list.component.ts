import { Component, OnInit } from '@angular/core';
import { WorkspacePojo } from '../WorkspacePojo';
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
    workspaceListInfo: WorkspacePojo[];
    constructor(
        private workspaceListService: WorkspaceListService,
        private router: Router
    ) {
    }
    ngOnInit() {
        this.accessToken = localStorage.getItem('accessToken');
        this.token_data = this.jwtHelper.decodeToken(this.accessToken);
        this.getWorkspaceListInfo(this.token_data.user.id);
    }

    getWorkspaceListInfo(id: string) {
        this.workspaceListService.getList(id).subscribe(result => {
            this.workspaceListInfo = result;

        });
    }
    gotoManagementPanel() {
        this.router.navigate(['workspace/management-panel']);
    }
}


