import { Component, OnInit } from '@angular/core';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from '../manage-members.service';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {

  manageMembersRequestData: ManageMembers[];

  constructor(private manageMembersService: ManageMembersService) {
  }

  ngOnInit() {
    this.getManageMembersData();
  }
  getManageMembersData() {

    this.manageMembersService.getManageMembersDetails()
      .subscribe(data => {
        this.manageMembersRequestData = data;
      });
     console.log('manage-members-component', this.manageMembersRequestData);
  }
  // onDelete(e: any) {
  //   console.log(e);
  //   this.manageMembersRequestData.splice(e, 1);
  // }
  onDelete(e: any): void {
    this.manageMembersRequestData = this.manageMembersRequestData.filter(h => h !== this.manageMembersRequestData[e]);
    this.manageMembersService.deleteManageMembersData(e).subscribe();
  }


}
