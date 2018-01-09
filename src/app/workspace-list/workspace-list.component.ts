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
    getWorkspaceListInfo() {
        this.workspaceListService.getList().subscribe(result => {
            console.log(result);
            this.workspaceListInfo = result.data.workspaces;
            console.log(this.workspaceListInfo);
        });
    }
}


