import { Component, OnInit } from '@angular/core';
import { MemberRequestService } from '../member-request.service';
import { MemberRequestData } from '../member-request-data';
@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements OnInit {

  memberRequestData : MemberRequestData[];

  isAvailable : boolean;
  constructor(private memberRequestService : MemberRequestService) {
    this.getMemberRequestData();
   }

  ngOnInit() {
  
  }
  getMemberRequestData(){
    console.log("*****************");
    this.memberRequestService.getMemberRequestDetails()
    .subscribe(data => {
      this.memberRequestData = data;
    });
    console.log('Finished');
    this.isAvailable = true;
  }
}
