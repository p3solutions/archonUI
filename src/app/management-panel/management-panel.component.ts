import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonUtilityService } from '../common-utility.service';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.css']
})
export class ManagementPanelComponent implements OnInit {

  checkAdmin = ['ROLE_MANAGE_DB']; // enable database
  checkSuper = ['ROLE_SUPER']; // enable configuration
  panelList = [
    {
      panelName: 'Databases',
      panelImage: 'livearchival.png',
      panelDesc: 'Configure and View Database Details.',
    },
    {
      panelName: 'Workspaces',
      panelImage: 'workspace.png',
      panelDesc: 'Configure, View and Workspace Details.',
    },
    {
      panelName: 'Users',
      panelImage: 'user.png',
      panelDesc: 'View and Modify User Role.',
    },
    {
      panelName: 'Configuration',
      panelImage: 'endtoendtoolkit.png',
      panelDesc: 'Configure, View and Edit Permissions.',
    }
  ];
  defDesc = 'Here is some more information about this product that is only revealed once clicked on.';
  panelGroupList = [];
  constructor(
    private router: Router,
    private commonUtilityService: CommonUtilityService,
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    const check = this.userinfoService.getRoleList();
    this.panelGroupList = this.panelList;
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
      case 'Configuration': {
        this.gotoConfiguration();
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

  gotoConfiguration() {
    this.router.navigate(['management-landing-page/configuration']);
  }
  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }
}
