import { Component, OnInit } from '@angular/core';
import { WorkspaceListInfo } from './workspace-list-data';
import { WorkspaceListService } from './workspace-list.service';
import { JwtHelper } from 'angular2-jwt';


@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {
    accessToken: string;
    jwtHelper: JwtHelper = new JwtHelper();
    token_data: any;
    workspaceListInfo: WorkspaceListInfo[];
    constructor(private workspaceListService: WorkspaceListService) {
    }
    ngOnInit() {
        this.accessToken = localStorage.getItem('accessToken');
        this.token_data = this.jwtHelper.decodeToken(this.accessToken);
        console.log(this.token_data);
        this.getWorkspaceListInfo(this.token_data.user.id);
    }
    setDatabaseList(data: WorkspaceListInfo[]) {
        let i, j;
        let dbarray = new Array();
        for (i in data) {
            if (i) {
                dbarray = [];
                for (j in this.workspaceListInfo[i].databases) {
                    if (j) {
                        dbarray.push(this.workspaceListInfo[i].databases[j].name);
                    }
                }
                const db = dbarray.join(', ');
                this.workspaceListInfo[i].databaseList = db;
            }
        }
    }
    getWorkspaceListInfo(id: string) {
        this.workspaceListService.getList(id).subscribe(result => {
            console.log(result);
            this.workspaceListInfo = result.data.workspaces;
            console.log(this.workspaceListInfo);
            this.setDatabaseList(this.workspaceListInfo);
        });

    }
}
