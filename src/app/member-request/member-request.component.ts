import { Component, OnInit } from '@angular/core';
import { MemberRequestService } from '../member-request.service';
@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements OnInit {

  memberRequestData : any;
  constructor(private memberRequestService : MemberRequestService) { }

  ngOnInit() {
    this.getMemberRequestData();
  }
  getMemberRequestData(){
    console.log("*****************");
    this.memberRequestService.getMemberRequestDetails()
    .subscribe(data => {
      this.memberRequestData = JSON.stringify(data);
    });
    console.log('Finished');
  }
}
