import { Component, OnInit } from '@angular/core';
import { MemberRequestService } from '../member-request.service';
import { MemberRequestData } from '../member-request-data';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements OnInit {

  memberRequestData: MemberRequestData[];

  total : number = 0;

  isAvailable: boolean = false;

  componentTitle : string = 'chandruashiwn';
  
  constructor(private memberRequestService: MemberRequestService,private route : ActivatedRoute) {
    this.getMemberRequestData();
  }

  ngOnInit() {
    console.log("***********");
    this.route.data
    .subscribe(data =>
      this.componentTitle = data.title);
    console.log(this.componentTitle);
  }
  getMemberRequestData() {

    this.memberRequestService.getMemberRequestDetails()
      .subscribe(data => {
        this.memberRequestData = data;
        this.isAvailable = true;
      });

  }
}
