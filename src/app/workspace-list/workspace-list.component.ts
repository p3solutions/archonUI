import { Component, OnInit } from '@angular/core';
import { WorkspaceListInfo } from './workspace-list-data';
import  { WorkspaceListService } from './workspace-list.service';
@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {

  workspaceListInfo : WorkspaceListInfo[];
  constructor(private workspaceListService : WorkspaceListService) { }

  ngOnInit() {
    console.log('hhhhhh');
    this.getWorkspaceListInfo();
  }
  getWorkspaceListInfo(){
    console.log('hai chandru');
    this.workspaceListService.getList().subscribe(data => 
      this.workspaceListInfo = data);
      console.log(this.workspaceListInfo);
  }
}
