import { Component, OnInit, Input } from '@angular/core';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from './manage-members.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import 'rxjs/add/operator/switchMap';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {
  workspaceId;

  manageMembers: ManageMembers[];
  isAvailable = false;
  memberPrivilegeParam: any;
  showMemPriv = false;
  varArray = [];

  constructor(
    private manageMembersService: ManageMembersService,
    private userinfoService: UserinfoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isAvailable = false;
      this.workspaceId = params.id;
      this.getManageMembersData(this.workspaceId);
    });
  }

  generatePrivVariables(len) {
    for (let i = 0; i < len; i++) {
      this.varArray[i] = false;
    }
  }
  getManageMembersData(workspaceId) {
    this.manageMembersService.getWSMembers(workspaceId)
      .subscribe(res => {
        this.isAvailable = true;
        this.generatePrivVariables(res.length);
        this.manageMembers = res;
      });
  }

  onDelete(e: any): void {
    this.manageMembers = this.manageMembers.filter(h => h !== this.manageMembers[e]);
    this.manageMembersService.deleteManageMembersData(e).subscribe();
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  hideElementById(id) {
    const e = document.getElementById(id);
    e.style.display = 'none';
  }
  showElementById(id) {
    const e = document.getElementById(id);
    e.style.display = 'block';
  }
  showPermission(i, _event, wsAccess) {
    _event.stopPropagation();
    this.hideElementById('showPermission-' + i);
    this.varArray[i] = true;
    /* this.memberPrivilegeParam = {
      id: this.userinfoService.getUserId(),
      userId: wsAccess.user.id,
      workspaceId: this.workspaceId,
      roleId: wsAccess.workspaceRole.id
    }; */
  }
  hidePermission(i, _event, wsAccess) {
    _event.stopPropagation();
    this.showElementById('showPermission-' + i);
    this.varArray[i] = false;
  }
}
