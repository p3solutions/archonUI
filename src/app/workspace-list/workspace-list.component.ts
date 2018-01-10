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


{
    "data": {
        "workspaces": [
            {
                "id": "5a55c85d9d226c08140a90d6",
                "createdAt": 1515571293,
                "updatedAt": 1515578378,
                "workspaceName": "WS_Alok",
                "owner": {
                    "id": "5a535cbb9d226c1a4c946607",
                    "name": "alok"
                },
                "masterMetadataVersion": 22,
                "databases": [
                    {
                        "id": "5a533baec7b4d489ed715b85",
                        "name": "SQL_DB_NAME",
                        "type": "SQL"
                    }
                ],
                "members": [
                    {
                        "createdAt": 1515571475,
                        "updatedAt": 1515578378,
                        "user": {
                            "id": "5a535c4a9d226c1a4c946605",
                            "name": "omji1"
                        },
                        "role": {
                            "id": "5a55c819c7b4d407523007bc",
                            "name": "ROLE_MEMBER"
                        }
                    }
                ]
            },
            {
                "id": "5a55dcb89d226c4607e16446",
                "createdAt": 1515576504,
                "updatedAt": 1515578378,
                "workspaceName": "WS_2",
                "masterMetadataVersion": 22,
                "databases": [
                    {
                        "id": "5a533baec7b4d489ed715b85",
                        "name": "SQL_DB_NAME",
                        "type": "SQL"
                    }
                ],
                "members": []
            }
        ]
    },
    "success": true,
    "httpStatus": 200
}