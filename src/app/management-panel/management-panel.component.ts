import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonUtilityService } from '../common-utility.service';

@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.css']
})
export class ManagementPanelComponent implements OnInit {

  panelList = [
    {
      panelName: 'Databases',
      panelImage: 'livearchival.png',
      panelDesc: 'Configure and View Database Details.',
    },
    {
      panelName: 'Workspaces',
      panelImage: 'metalyzer.png',
      panelDesc: 'Configure, View and Workspace Details.',
    },
    {
      panelName: 'Users',
      panelImage: 'user.png',
      panelDesc: 'View and Modify User Role.',
    },
    // {
    //   panelName: 'Permissions',
    //   panelImage: 'endtoendtoolkit.png',
    //   panelDesc: 'Configure, view and edit permissions.',
    // }
  ];
  defDesc = 'Here is some more information about this product that is only revealed once clicked on.';
  panelGroupList: any;
  constructor(
    private router: Router,
    private commonUtilityService: CommonUtilityService
  ) { }

  ngOnInit() {
    this.panelGroupList = this.commonUtilityService.groupOutArray(this.panelList, 4);
  }

  goTo(panel) {
    switch (panel.panelName) {
      case 'Databases': {
        this.gotoConfigDatabaseList();
        break;
      }
      case 'Workspaces': {
        this.gotoWorkspaceList();
        break;
      }
      case 'Users': {
        this.gotoManageUserRoles();
        break;
      }
      case 'Permissions': {
        break;
      }
      default: console.log('Not configured for ', panel.panelName);
    }
  }

  gotoManageUserRoles() {
    this.router.navigate(['management-landing-page/manage-user-roles']);
  }
  gotoWorkspaceList() {
        this.router.navigate(['management-landing-page/workspace-list']);
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
  gotoConfigDatabaseList() {
    this.router.navigate(['management-landing-page/database-list']);
  }
  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }
}
