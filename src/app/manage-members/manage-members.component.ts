import { Component, OnInit, Input } from '@angular/core';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from './manage-members.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
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

  getManageMembersData(workspaceId) {
    this.manageMembersService.getWSMembers(workspaceId)
      .subscribe(res => {
        this.isAvailable = true;
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

  toggleClasses(_selector, classNameA, classNameB) {
    if (_selector.hasClass(classNameA)) {
      _selector.addClass(classNameB);
      _selector.removeClass(classNameA);
    } else {
      _selector.addClass(classNameA);
      _selector.removeClass(classNameB);
    }
  }
  generatePrivilegeDetails(_event, wsAccess) {
    _event.stopPropagation();
    const _viewMore = $(_event.target).parents('td');
    this.toggleClasses(_viewMore, 'toggle-expand', 'toggle-collapse');
    const _dataRow = $('tr[data-user-id="' + wsAccess.user.id + '"]');
    if (_dataRow.find('app-manage-member-privileges').length === 0) {
      this.showMemPriv = true;
    }
    this.toggleClasses(_dataRow, 'toggle-expand', 'toggle-collapse');
    this.memberPrivilegeParam = {
      id: this.userinfoService.getUserId(),
      userId: wsAccess.user.id,
      workspaceId: this.workspaceId,
      roleId: wsAccess.workspaceRole.id
    };
  }

}
