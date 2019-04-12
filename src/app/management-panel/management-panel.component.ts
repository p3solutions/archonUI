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
      enable: false
    },
    {
      panelName: 'Workspaces',
      panelImage: 'workspace.png',
      panelDesc: 'Configure, View and Workspace Details.',
      enable: true
    },
    {
      panelName: 'Users',
      panelImage: 'user.png',
      panelDesc: 'View and Modify User Role.',
      enable: true
    },
    {
      panelName: 'Configuration',
      panelImage: 'endtoendtoolkit.png',
      panelDesc: 'Configure, View and Edit Permissions.',
      enable: false
    }
  ];
  panelGroupList = [];
  constructor(
    private router: Router,
    private commonUtilityService: CommonUtilityService,
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    const check = this.userinfoService.getRoleList();
    for (const i of this.panelList) {
      if (i.panelName === 'Databases') {
      for (const j of check) {
        if (this.checkAdmin.includes(j)) {
        i.enable = true;
        }
      }
      }
      if (i.panelName === 'Configuration') {
        for (const j of check) {
          if (this.checkSuper.includes(j)) {
          i.enable = true;
          }
        }
        }
    }
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
