import { Component, OnInit } from '@angular/core';
import { MemberRequestService } from '../member-request.service';
import { MemberRequestData } from '../member-request-data';
@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements OnInit {

  memberRequestData: MemberRequestData[];

  total : number = 0;

  isAvailable: boolean = false;

  constructor(private memberRequestService: MemberRequestService) {
    this.getMemberRequestData();
  }

  ngOnInit() {

  }
  getMemberRequestData() {

    this.memberRequestService.getMemberRequestDetails()
      .subscribe(data => {
        this.memberRequestData = data;
        this.isAvailable = true;
      });

  }
}
