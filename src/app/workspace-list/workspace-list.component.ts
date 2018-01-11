import { Component, OnInit } from '@angular/core';
import { WorkspaceListInfo } from './workspace-list-data';
import { WorkspaceListService } from './workspace-list.service';


@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {

    workspaceListInfo: WorkspaceListInfo[];
    constructor(private workspaceListService: WorkspaceListService) {
    }
    ngOnInit() {
        this.getWorkspaceListInfo();
    }
    setDatabaseList(data: WorkspaceListInfo[]) {
        var i, j;
        var dbarray = new Array();
        for (i in data) {
            dbarray = [];
            for (j in this.workspaceListInfo[i].databases) {
                dbarray.push(this.workspaceListInfo[i].databases[j].name);
            }
            var db = dbarray.join(", ");
            this.workspaceListInfo[i].databaseList = db;
        }
    }
    getWorkspaceListInfo() {
        this.workspaceListService.getList().subscribe(result => {
            console.log(result);
            this.workspaceListInfo = result.data.workspaces;
            console.log(this.workspaceListInfo);
            this.setDatabaseList(this.workspaceListInfo);
        });

    }
}


