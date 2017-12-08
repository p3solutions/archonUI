import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.css']
})
export class WorkspaceHeaderComponent implements OnInit {
  workspace1: any;
  workspace2: any;
  userWorkspaceArray: any;

  constructor() {
    // ToDo: need to delete these data and read from in-memory service
    this.workspace1 = {
      name: 'Sample workspace',
      members: 22,
      masterMetaVersion: 22
    };
    this.workspace2 = {
      name: 'Sample 2',
      members: 20,
      masterMetaVersion: 23
    };
    this.userWorkspaceArray = [
      this.workspace2,
      this.workspace1,
      this.workspace2,
      this.workspace1
    ];
   }

  ngOnInit() {
  }

}
