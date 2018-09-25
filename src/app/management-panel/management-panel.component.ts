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
      panelDesc: 'Configure, view and edit databases.',
    },
    {
      panelName: 'Workspaces',
      panelImage: 'metalyzer.png',
      panelDesc: 'Configure, view and edit workspaces.',
    },
    {
      panelName: 'Users',
      panelImage: 'livearchival.png',
      panelDesc: 'Configure, view and edit users.',
    },
    {
      panelName: 'Permissions',
      panelImage: 'endtoendtoolkit.png',
      panelDesc: 'Configure, view and edit permissions.',
    }
  ];
  defDesc = 'Here is some more information about this product that is only revealed once clicked on.';
  panelGroupList: any;
  constructor(
    private router: Router,
    private commonUtilityService: CommonUtilityService
  ) { }

  ngOnInit() {
    this.panelGroupList = this.commonUtilityService.groupOutArray(this.panelList, 3);
  }

  goTo(panel) {
    switch (panel.panelName) {
      case 'Databases' : {
          this.gotoConfigDatabaseList();
          break;
      }
      case 'Workspaces' : {
          this.gotoWorkspaceList();
          break;
      }
      case 'Users' : {
          this.gotoManageUserRoles();
          break;
      }
      case 'Permissions' : {
          this.gotoConfigDatabaseList();
          break;
      }
      default: console.log('Not configured for ', panel.panelName);
    }
  }

  gotoManageUserRoles() {
    this.router.navigate(['workspace/manage-user-roles']);
  }
  gotoWorkspaceList() {
    this.router.navigate(['workspace/workspace-list']);
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
  gotoConfigDatabaseList() {
    this.router.navigate(['workspace/database-list']);
  }
  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }
}
