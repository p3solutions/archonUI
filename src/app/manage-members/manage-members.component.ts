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
    this.getManageMembersData();
  }

  ngOnInit() {

  }
  getManageMembersData() {

    this.manageMembersService.getManageMembersDetails()
      .subscribe(data => {
        this.manageMembersRequestData = data;
        console.log(this.manageMembersRequestData[0]['sl_no']);
      });

  }


}
