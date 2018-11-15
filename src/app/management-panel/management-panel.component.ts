import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonUtilityService } from '../common-utility.service';
import { archonConfig } from '../config';

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
          break;
      }
      default: console.log('Not configured for ', panel.panelName);
    }
  }

  gotoManageUserRoles() {
    this.router.navigateByUrl(archonConfig.Urls.userRolesRoute);
  }
  gotoWorkspaceList() {
    this.router.navigateByUrl(archonConfig.Urls.wokspaceRoute);
  }
  gotoDashboard() {
    this.router.navigateByUrl(archonConfig.Urls.workspaceServiceRoute);
  }
  gotoConfigDatabaseList() {
    this.router.navigateByUrl(archonConfig.Urls.databaseListRoute);
  }
  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }
}
