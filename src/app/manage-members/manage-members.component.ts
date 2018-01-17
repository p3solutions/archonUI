import { Component, OnInit, Input } from '@angular/core';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from './manage-members.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {
  workspaceId;

  manageMembers: ManageMembers[];
  isAvailable = false;

  constructor(
    private manageMembersService: ManageMembersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.getManageMembersData();
  }

  ngOnInit() {
    this.workspaceId = this.route.snapshot.paramMap.get('id');
    this.getManageMembersData(this.workspaceId);
  }

  getManageMembersData(workspaceId) {
    console.log(workspaceId);
    this.manageMembersService.getWSMembers(workspaceId)
      .subscribe(res => {
        this.isAvailable = true;
        console.log('manage-members-component', res);
      });
  }

  onDelete(e: any): void {
    this.manageMembers = this.manageMembers.filter(h => h !== this.manageMembers[e]);
    this.manageMembersService.deleteManageMembersData(e).subscribe();
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }


}
