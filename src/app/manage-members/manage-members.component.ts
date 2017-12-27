import { Component, OnInit } from '@angular/core';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from '../manage-members.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {

  manageMembersRequestData: ManageMembers[];
  isAvailable = false;

  constructor(
    private manageMembersService: ManageMembersService,
    private router: Router
  ) {
    this.getManageMembersData();
  }

  ngOnInit() {
    this.getManageMembersData();
  }
  getManageMembersData() {

    this.manageMembersService.getManageMembersDetails()
      .subscribe(data => {
        this.manageMembersRequestData = data;
        this.isAvailable = true;
      });
     console.log('manage-members-component', this.manageMembersRequestData);
  }

  onDelete(e: any): void {
    this.manageMembersRequestData = this.manageMembersRequestData.filter(h => h !== this.manageMembersRequestData[e]);
    this.manageMembersService.deleteManageMembersData(e).subscribe();
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }


}
