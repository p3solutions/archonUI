import { Component, OnInit } from '@angular/core';
import { MemberRequestService } from './member-request.service';
import { MemberRequestData } from '../member-request-data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements OnInit {

  memberRequestData: MemberRequestData[];
  isAvailable = false;

  constructor(private memberRequestService: MemberRequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMemberRequestData();
  }
  getMemberRequestData() {
    this.memberRequestService.getMemberRequestDetails()
      .subscribe(data => {
        this.memberRequestData = data;
        this.isAvailable = true;
      });
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
